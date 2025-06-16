import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import './AdminPage.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('articles');
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const { articles, services, doctors, loading, addItem, updateItem, deleteItem } = useAdmin();

  const handleAdd = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteItem(activeTab, id);
    }
  };

  const handleSave = (formData) => {
    if (editingItem) {
      updateItem(activeTab, { ...formData, id: editingItem.id });
    } else {
      addItem(activeTab, formData);
    }
    setShowModal(false);
  };

  const renderTable = () => {
    let data = [];
    let columns = [];

    if (activeTab === 'articles') {
      data = articles;
      columns = ['제목', '카테고리', '작성자', '작성일', '상태', '액션'];
    } else if (activeTab === 'services') {
      data = services;
      columns = ['서비스명', '카테고리', '가격', '상태', '액션'];
    } else if (activeTab === 'doctors') {
      data = doctors;
      columns = ['이름', '전문과목', '경력', '소속병원', '상태', '액션'];
    }

    return (
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                {activeTab === 'articles' && (
                  <>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.author}</td>
                    <td>{item.date}</td>
                    <td>
                      <span className={`status ${item.status}`}>
                        {item.status === 'published' ? '게시됨' : '임시저장'}
                      </span>
                    </td>
                  </>
                )}
                {activeTab === 'services' && (
                  <>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>
                      <span className={`status ${item.status}`}>
                        {item.status === 'active' ? '활성' : '비활성'}
                      </span>
                    </td>
                  </>
                )}
                {activeTab === 'doctors' && (
                  <>
                    <td>{item.name}</td>
                    <td>{item.specialty}</td>
                    <td>{item.experience}</td>
                    <td>{item.hospital}</td>
                    <td>
                      <span className={`status ${item.status}`}>
                        {item.status === 'active' ? '활성' : '비활성'}
                      </span>
                    </td>
                  </>
                )}
                <td>
                  <button 
                    className="btn-edit" 
                    onClick={() => handleEdit(item)}
                  >
                    수정
                  </button>
                  <button 
                    className="btn-delete" 
                    onClick={() => handleDelete(item.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>디지털헬스케어 관리자 페이지</h1>
        <p>콘텐츠를 관리하고 업데이트하세요</p>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>데이터를 불러오는 중...</p>
        </div>
      ) : (
        <>
          <div className="admin-tabs">
            <button 
              className={`tab ${activeTab === 'articles' ? 'active' : ''}`}
              onClick={() => setActiveTab('articles')}
            >
              건강 정보 관리
            </button>
            <button 
              className={`tab ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              서비스 관리
            </button>
            <button 
              className={`tab ${activeTab === 'doctors' ? 'active' : ''}`}
              onClick={() => setActiveTab('doctors')}
            >
              의료진 관리
            </button>
          </div>

          <div className="admin-content">
            <div className="content-header">
              <h2>
                {activeTab === 'articles' && '건강 정보 관리'}
                {activeTab === 'services' && '서비스 관리'}
                {activeTab === 'doctors' && '의료진 관리'}
              </h2>
              <button className="btn-add" onClick={handleAdd}>
                + 새로 추가
              </button>
            </div>

            {renderTable()}
          </div>

          {showModal && (
            <AdminModal
              activeTab={activeTab}
              editingItem={editingItem}
              onSave={handleSave}
              onClose={() => setShowModal(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

// 모달 컴포넌트
const AdminModal = ({ activeTab, editingItem, onSave, onClose }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      // 새로 추가할 때 기본값 설정
      if (activeTab === 'articles') {
        setFormData({
          title: '',
          content: '',
          category: '',
          author: '',
          date: new Date().toISOString().split('T')[0],
          status: 'draft'
        });
      } else if (activeTab === 'services') {
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          status: 'active'
        });
      } else if (activeTab === 'doctors') {
        setFormData({
          name: '',
          specialty: '',
          experience: '',
          hospital: '',
          status: 'active'
        });
      }
    }
  }, [activeTab, editingItem]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>
            {editingItem ? '수정' : '추가'} - 
            {activeTab === 'articles' && ' 건강 정보'}
            {activeTab === 'services' && ' 서비스'}
            {activeTab === 'doctors' && ' 의료진'}
          </h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {activeTab === 'articles' && (
            <>
              <div className="form-group">
                <label>제목</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>내용</label>
                <textarea
                  name="content"
                  value={formData.content || ''}
                  onChange={handleChange}
                  rows="5"
                  required
                />
              </div>
              <div className="form-group">
                <label>카테고리</label>
                <select
                  name="category"
                  value={formData.category || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="">선택하세요</option>
                  <option value="내분비내과">내분비내과</option>
                  <option value="심장내과">심장내과</option>
                  <option value="정신건강의학과">정신건강의학과</option>
                  <option value="가정의학과">가정의학과</option>
                </select>
              </div>
              <div className="form-group">
                <label>작성자</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>상태</label>
                <select
                  name="status"
                  value={formData.status || ''}
                  onChange={handleChange}
                >
                  <option value="draft">임시저장</option>
                  <option value="published">게시</option>
                </select>
              </div>
            </>
          )}

          {activeTab === 'services' && (
            <>
              <div className="form-group">
                <label>서비스명</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>설명</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  rows="3"
                  required
                />
              </div>
              <div className="form-group">
                <label>가격</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>카테고리</label>
                <select
                  name="category"
                  value={formData.category || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="">선택하세요</option>
                  <option value="진료">진료</option>
                  <option value="검진">검진</option>
                  <option value="상담">상담</option>
                  <option value="처방">처방</option>
                </select>
              </div>
              <div className="form-group">
                <label>상태</label>
                <select
                  name="status"
                  value={formData.status || ''}
                  onChange={handleChange}
                >
                  <option value="active">활성</option>
                  <option value="inactive">비활성</option>
                </select>
              </div>
            </>
          )}

          {activeTab === 'doctors' && (
            <>
              <div className="form-group">
                <label>이름</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>전문과목</label>
                <select
                  name="specialty"
                  value={formData.specialty || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="">선택하세요</option>
                  <option value="내분비내과">내분비내과</option>
                  <option value="심장내과">심장내과</option>
                  <option value="정신건강의학과">정신건강의학과</option>
                  <option value="가정의학과">가정의학과</option>
                  <option value="피부과">피부과</option>
                </select>
              </div>
              <div className="form-group">
                <label>경력</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience || ''}
                  onChange={handleChange}
                  placeholder="예: 15년"
                  required
                />
              </div>
              <div className="form-group">
                <label>소속병원</label>
                <input
                  type="text"
                  name="hospital"
                  value={formData.hospital || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>상태</label>
                <select
                  name="status"
                  value={formData.status || ''}
                  onChange={handleChange}
                >
                  <option value="active">활성</option>
                  <option value="inactive">비활성</option>
                </select>
              </div>
            </>
          )}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              취소
            </button>
            <button type="submit" className="btn-save">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
