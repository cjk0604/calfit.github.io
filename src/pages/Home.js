import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button, 
  Box, 
  Chip, 
  Divider,
  Rating,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  TrendingUp as TrendingIcon,
  Whatshot as HotIcon,
  NewReleases as NewIcon,
  Bookmark as BookmarkIcon
} from '@mui/icons-material';

// Import mock data and styles
import { brands } from '../data/brands';
import './Home.css';

const Home = () => {
  const [featuredBrand, setFeaturedBrand] = useState(null);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Find a featured brand for the hero section
    const featured = brands.find(brand => brand.featured);
    setFeaturedBrand(featured || brands[0]);
    
    // Initial filter - show all brands
    handleTabChange(null, 0);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    
    // Filter brands based on selected tab
    switch(newValue) {
      case 0: // All
        setFilteredBrands(brands);
        break;
      case 1: // Featured
        setFilteredBrands(brands.filter(brand => brand.featured));
        break;
      case 2: // Popular
        setFilteredBrands([...brands].sort((a, b) => b.rating - a.rating));
        break;
      case 3: // Recent
        setFilteredBrands([...brands].sort((a, b) => b.id - a.id).slice(0, 6));
        break;
      default:
        setFilteredBrands(brands);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Hero Section */}
      {featuredBrand && (
        <Box 
          sx={{ 
            position: 'relative',
            mb: 6,
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 3,
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${featuredBrand.logo}) center/cover no-repeat`,
            height: { xs: '400px', md: '500px' },
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <Box sx={{ p: { xs: 3, md: 5 }, width: '100%' }}>
            <Chip 
              label="오늘의 추천 브랜드" 
              color="primary" 
              icon={<TrendingIcon />} 
              sx={{ mb: 2 }}
            />
            <Typography variant="h3" component="h1" color="white" gutterBottom fontWeight="bold">
              {featuredBrand.name}
            </Typography>
            <Typography variant="subtitle1" color="white" paragraph sx={{ mb: 3, maxWidth: '800px' }}>
              {featuredBrand.description}
            </Typography>
            <Button 
              variant="contained" 
              component={Link} 
              to={`/brand/${featuredBrand.id}`}
              size="large"
              sx={{ 
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }}
            >
              자세히 보기
            </Button>
          </Box>
        </Box>
      )}

      {/* Tabs for filtering */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : false}
          centered={!isMobile}
          className="filter-tabs"
        >
          <Tab label="전체 브랜드" />
          <Tab icon={<BookmarkIcon />} label="추천 브랜드" iconPosition="start" />
          <Tab icon={<HotIcon />} label="인기 브랜드" iconPosition="start" />
          <Tab icon={<NewIcon />} label="최신 브랜드" iconPosition="start" />
        </Tabs>
      </Box>

      {/* Brand Cards */}
      <Grid container spacing={3} className="brand-cards-container">
        {filteredBrands.map((brand) => (
          <Grid item xs={12} sm={6} md={4} key={brand.id}>
            <Card 
              className="brand-card" 
              sx={{ 
                height: { xs: 420, sm: 460, md: 480 }, // 반응형 고정 높이
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 4
                }
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={brand.logo}
                alt={brand.name}
                sx={{ 
                  objectFit: 'cover',
                  height: { xs: '140px', sm: '160px', md: '180px' } // 반응형 이미지 높이
                }}
              />
              <CardContent sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column',
                height: 'calc(100% - 180px - 60px)', // 이미지와 액션 영역 제외한 높이
                overflow: 'hidden'
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {brand.category}
                  </Typography>
                  <Rating value={brand.rating} precision={0.5} size="small" readOnly />
                </Box>
                <Typography variant="h6" component="h2" gutterBottom sx={{ 
                  minHeight: '32px', // 제목 최소 높이 고정
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }} className="brand-title">
                  {brand.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ 
                  flexGrow: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: { xs: 2, sm: 3 }, // 모바일에서는 2줄, 데스크톱에서는 3줄
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  mb: 2,
                  minHeight: { xs: '40px', sm: '60px' }, // 반응형 최소 높이
                  lineHeight: 1.4
                }} className="brand-description">
                  {brand.description}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 0.5, 
                  mt: 'auto',
                  minHeight: '32px' // 태그 영역 최소 높이 고정
                }}>
                  {brand.keyFeatures.slice(0, 3).map((feature, index) => (
                    <Chip 
                      key={index} 
                      label={feature} 
                      size="small" 
                      sx={{ 
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        fontSize: '0.75rem'
                      }} 
                    />
                  ))}
                  {brand.keyFeatures.length > 3 && (
                    <Chip 
                      label={`+${brand.keyFeatures.length - 3}`} 
                      size="small" 
                      sx={{ 
                        bgcolor: 'background.paper',
                        fontSize: '0.75rem'
                      }} 
                    />
                  )}
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ 
                height: '60px', // 액션 영역 고정 높이
                display: 'flex',
                alignItems: 'center',
                px: 2
              }}>
                <Button 
                  size="small" 
                  component={Link} 
                  to={`/brand/${brand.id}`}
                  sx={{ color: 'primary.main' }}
                >
                  자세히 보기
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant="caption" color="text.secondary">
                  리뷰 {brand.reviews}개
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Newsletter Section */}
      <Box 
        sx={{ 
          mt: 8, 
          p: { xs: 3, md: 5 }, 
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
          textAlign: 'center',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
          최신 디지털 헬스케어 트렌드를 받아보세요
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
          매주 엄선된 디지털 헬스케어 브랜드 소식과 업계 트렌드를 이메일로 받아보세요.
          새로운 혁신과 기술 동향을 놓치지 않도록 도와드립니다.
        </Typography>
        <Box 
          component="form" 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            maxWidth: '600px', 
            mx: 'auto',
            gap: 2
          }}
        >
          <input
            type="email"
            placeholder="이메일 주소"
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          />
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              minWidth: { xs: '100%', sm: '150px' },
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            구독하기
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
