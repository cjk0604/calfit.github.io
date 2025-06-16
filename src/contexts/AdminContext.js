import React, { createContext, useContext, useReducer, useEffect } from 'react';

// 초기 상태
const initialState = {
  articles: [],
  services: [],
  doctors: [],
  loading: false,
  error: null
};

// 액션 타입
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  LOAD_DATA: 'LOAD_DATA',
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM'
};

// 리듀서
const adminReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ActionTypes.LOAD_DATA:
      return { 
        ...state, 
        ...action.payload, 
        loading: false, 
        error: null 
      };
    
    case ActionTypes.ADD_ITEM:
      return {
        ...state,
        [action.category]: [...state[action.category], action.payload]
      };
    
    case ActionTypes.UPDATE_ITEM:
      return {
        ...state,
        [action.category]: state[action.category].map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    
    case ActionTypes.DELETE_ITEM:
      return {
        ...state,
        [action.category]: state[action.category].filter(item => item.id !== action.payload)
      };
    
    default:
      return state;
  }
};

// 컨텍스트 생성
const AdminContext = createContext();

// 프로바이더 컴포넌트
export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  // 초기 데이터 로드
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    
    // 실제 환경에서는 API 호출
    setTimeout(() => {
      const mockData = {
        articles: [
          {
            id: 1,
            title: '당뇨병 관리의 새로운 접근법',
            content: '최신 연구에 따르면 개인맞춤형 치료가 효과적입니다. 혈당 모니터링과 생활습관 개선을 통해 더 나은 결과를 얻을 수 있습니다.',
            category: '내분비내과',
            author: '김의사',
            date: '2024-06-15',
            status: 'published',
            tags: ['당뇨병', '개인맞춤형치료', '혈당관리']
          },
          {
            id: 2,
            title: '심혈관 질환 예방 가이드',
            content: '규칙적인 운동과 식단 관리가 중요합니다. 금연과 스트레스 관리도 심혈관 건강에 큰 영향을 미칩니다.',
            category: '심장내과',
            author: '이의사',
            date: '2024-06-14',
            status: 'draft',
            tags: ['심혈관질환', '예방', '운동', '식단']
          }
        ],
        services: [
          {
            id: 1,
            name: '원격 진료',
            description: '집에서 편리하게 받는 의료 상담 서비스입니다.',
            price: '30,000원',
            category: '진료',
            status: 'active',
            duration: '30분',
            features: ['화상통화', '처방전발급', '24시간예약']
          },
          {
            id: 2,
            name: '건강 검진 패키지',
            description: '종합적인 건강 상태 점검 서비스입니다.',
            price: '150,000원',
            category: '검진',
            status: 'active',
            duration: '2시간',
            features: ['혈액검사', '영상검사', '전문의상담']
          }
        ],
        doctors: [
          {
            id: 1,
            name: '김철수',
            specialty: '내분비내과',
            experience: '15년',
            hospital: '서울대병원',
            status: 'active',
            education: '서울대학교 의과대학',
            certifications: ['내분비내과 전문의', '당뇨병 전문의']
          },
          {
            id: 2,
            name: '이영희',
            specialty: '심장내과',
            experience: '12년',
            hospital: '삼성서울병원',
            status: 'active',
            education: '연세대학교 의과대학',
            certifications: ['심장내과 전문의', '심장초음파 전문의']
          }
        ]
      };
      
      dispatch({ type: ActionTypes.LOAD_DATA, payload: mockData });
    }, 1000);
  };

  const addItem = (category, item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    dispatch({ type: ActionTypes.ADD_ITEM, category, payload: newItem });
  };

  const updateItem = (category, item) => {
    dispatch({ type: ActionTypes.UPDATE_ITEM, category, payload: item });
  };

  const deleteItem = (category, id) => {
    dispatch({ type: ActionTypes.DELETE_ITEM, category, payload: id });
  };

  const value = {
    ...state,
    addItem,
    updateItem,
    deleteItem,
    loadInitialData
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

// 커스텀 훅
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export default AdminContext;
