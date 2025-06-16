import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider, IconButton } from '@mui/material';
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  Instagram as InstagramIcon, 
  LinkedIn as LinkedInIcon,
  LocalHospital as HealthIcon
} from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper',
        py: 6,
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <HealthIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" color="primary.main" fontWeight="bold">
                헬스테크 인사이트
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              매일 새로운 디지털 헬스케어 브랜드를 소개하고 분석하는 전문 블로그입니다.
              최신 트렌드와 혁신적인 기술을 통해 건강한 미래를 만들어가는 기업들을 만나보세요.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary" aria-label="facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" aria-label="twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" aria-label="instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="primary" aria-label="linkedin">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              빠른 링크
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {['홈', '최신 브랜드', '인기 브랜드', '카테고리', '소개', '문의하기'].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link href="#" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              카테고리
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {['원격 의료', '웨어러블 기기', '건강 모니터링', '디지털 치료제', '의료 AI', '헬스케어 앱'].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link href="#" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} 헬스테크 인사이트. All rights reserved.
          </Typography>
          <Box sx={{ mt: { xs: 2, sm: 0 } }}>
            <Link href="#" color="text.secondary" sx={{ mx: 1 }}>
              개인정보처리방침
            </Link>
            <Link href="#" color="text.secondary" sx={{ mx: 1 }}>
              이용약관
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
