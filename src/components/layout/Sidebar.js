import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Chip,
  Avatar,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  TrendingUp as TrendingIcon,
  Bookmark as BookmarkIcon,
  Category as CategoryIcon
} from '@mui/icons-material';

// Mock data for popular brands
const popularBrands = [
  { id: 1, name: '애플 헬스', category: '웨어러블' },
  { id: 2, name: '삼성 헬스', category: '모바일 앱' },
  { id: 3, name: '네이버 메디컬', category: '원격 의료' },
  { id: 4, name: '닥터나우', category: '원격 진료' },
  { id: 5, name: '웰트', category: '스마트 벨트' }
];

// Mock data for categories
const categories = [
  { name: '원격 의료', count: 24 },
  { name: '웨어러블 기기', count: 18 },
  { name: '건강 모니터링', count: 15 },
  { name: '디지털 치료제', count: 12 },
  { name: '의료 AI', count: 9 },
  { name: '헬스케어 앱', count: 21 }
];

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return null; // Don't render sidebar on mobile
  }

  return (
    <Box component="aside" sx={{ width: 300 }}>
      {/* Newsletter Subscription */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
          뉴스레터 구독
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          최신 디지털 헬스케어 트렌드와 브랜드 소식을 받아보세요.
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <input
            type="email"
            placeholder="이메일 주소"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ 
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            구독하기
          </Button>
        </Box>
      </Paper>

      {/* Popular Brands */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrendingIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">
            인기 브랜드
          </Typography>
        </Box>
        <List disablePadding>
          {popularBrands.map((brand, index) => (
            <React.Fragment key={brand.id}>
              {index > 0 && <Divider component="li" />}
              <ListItem 
                component={Link} 
                to={`/brand/${brand.id}`}
                sx={{ 
                  px: 0, 
                  py: 1.5,
                  '&:hover': {
                    color: 'primary.main',
                  }
                }}
              >
                <ListItemText 
                  primary={brand.name} 
                  secondary={brand.category}
                  primaryTypographyProps={{
                    fontWeight: 500,
                  }}
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Categories */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CategoryIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">
            카테고리
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {categories.map((category) => (
            <Chip
              key={category.name}
              label={`${category.name} (${category.count})`}
              component={Link}
              to={`/category/${category.name}`}
              clickable
              sx={{ 
                mb: 1,
                '&:hover': {
                  bgcolor: 'primary.light',
                  color: 'white',
                }
              }}
            />
          ))}
        </Box>
      </Paper>

      {/* Featured Author */}
      <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
          에디터 소개
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            sx={{ width: 60, height: 60, mr: 2 }}
            alt="Editor"
            src="https://randomuser.me/api/portraits/women/44.jpg"
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              김건강
            </Typography>
            <Typography variant="body2" color="text.secondary">
              디지털 헬스케어 전문가
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          10년 이상의 헬스케어 산업 경험을 바탕으로 최신 디지털 헬스케어 트렌드와 혁신 기업을 소개합니다.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Sidebar;
