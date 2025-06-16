import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          py: 8
        }}
      >
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            fontSize: { xs: '6rem', md: '10rem' },
            fontWeight: 700,
            color: 'primary.main',
            mb: 2
          }}
        >
          404
        </Typography>
        
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          sx={{ mb: 3 }}
        >
          페이지를 찾을 수 없습니다
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          paragraph
          sx={{ maxWidth: '600px', mb: 4 }}
        >
          요청하신 페이지가 존재하지 않거나, 이동되었거나, 일시적으로 사용할 수 없습니다.
          URL을 확인하시거나 아래 버튼을 클릭하여 홈페이지로 이동해주세요.
        </Typography>
        
        <Button 
          variant="contained" 
          component={Link} 
          to="/"
          startIcon={<HomeIcon />}
          size="large"
        >
          홈으로 돌아가기
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
