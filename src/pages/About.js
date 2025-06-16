import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Avatar, 
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material';
import { 
  Visibility as VisionIcon,
  Lightbulb as MissionIcon,
  Psychology as ValuesIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const About = () => {
  // Mock team data
  const teamMembers = [
    {
      name: '김건강',
      position: '창립자 & 편집장',
      bio: '10년 이상의 헬스케어 산업 경험을 바탕으로 디지털 헬스케어의 미래를 탐구합니다.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: '이테크',
      position: '수석 에디터',
      bio: '의료 기기 전문가로서 최신 디지털 헬스케어 기술을 분석하고 소개합니다.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: '박디지털',
      position: '리서치 디렉터',
      bio: '헬스케어 스타트업 생태계 연구 및 트렌드 분석을 담당합니다.',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      name: '최혁신',
      position: '기술 에디터',
      bio: '인공지능과 빅데이터 기반 헬스케어 솔루션을 전문적으로 다룹니다.',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          mb: 6,
          p: { xs: 3, md: 5 },
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          헬스테크 인사이트 소개
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph sx={{ maxWidth: '800px', mx: 'auto' }}>
          디지털 헬스케어의 미래를 선도하는 혁신적인 브랜드와 기술을 소개하는 전문 블로그입니다.
          매일 새로운 브랜드를 조사하고 분석하여 디지털 헬스케어 산업의 최신 트렌드를 전달합니다.
        </Typography>
      </Box>

      {/* Our Vision, Mission, Values */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              height: '100%', 
              border: '1px solid', 
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60, mb: 2 }}>
              <VisionIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              비전
            </Typography>
            <Typography variant="body1">
              디지털 헬스케어 혁신을 통해 모든 사람이 더 건강하고 행복한 삶을 누릴 수 있는 세상을 만듭니다.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              height: '100%', 
              border: '1px solid', 
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <Avatar sx={{ bgcolor: 'secondary.main', width: 60, height: 60, mb: 2 }}>
              <MissionIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              미션
            </Typography>
            <Typography variant="body1">
              혁신적인 디지털 헬스케어 브랜드와 기술을 발굴하고 소개하여, 사용자들이 최신 건강 관리 솔루션을 쉽게 접하고 활용할 수 있도록 돕습니다.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              height: '100%', 
              border: '1px solid', 
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <Avatar sx={{ bgcolor: 'primary.light', width: 60, height: 60, mb: 2 }}>
              <ValuesIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              핵심 가치
            </Typography>
            <Typography variant="body1">
              정확성, 투명성, 혁신성을 바탕으로 사용자에게 가치 있는 정보를 제공하며, 디지털 헬스케어 생태계의 발전에 기여합니다.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Our Story */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
          우리의 이야기
        </Typography>
        <Typography variant="body1" paragraph>
          헬스테크 인사이트는 2023년, 디지털 헬스케어 분야의 전문가들이 모여 시작한 프로젝트입니다. 
          코로나19 팬데믹 이후 급속도로 발전하는 디지털 헬스케어 시장에서, 소비자와 전문가들이 신뢰할 수 있는 정보를 제공하는 플랫폼의 필요성을 느꼈습니다.
        </Typography>
        <Typography variant="body1" paragraph>
          우리는 매일 새로운 디지털 헬스케어 브랜드를 조사하고 분석하여, 그 가치와 혁신성을 평가합니다. 
          단순한 제품 소개를 넘어, 각 브랜드의 기술적 특징, 사용자 경험, 시장에서의 위치 등을 종합적으로 분석하여 깊이 있는 인사이트를 제공합니다.
        </Typography>
        <Typography variant="body1" paragraph>
          헬스테크 인사이트는 독자들이 디지털 헬스케어의 복잡한 세계를 쉽게 이해하고, 자신에게 맞는 솔루션을 찾을 수 있도록 돕는 것을 목표로 합니다. 
          또한 혁신적인 스타트업과 기업들이 더 많은 사람들에게 알려질 수 있는 플랫폼이 되고자 합니다.
        </Typography>
      </Box>

      <Divider sx={{ mb: 6 }} />

      {/* Our Team */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
          우리 팀 소개
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  height: '100%', 
                  border: '1px solid', 
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <Avatar 
                  src={member.avatar} 
                  alt={member.name}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  {member.position}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.bio}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* What We Do */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
          우리가 하는 일
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>1</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="브랜드 리서치 및 분석"
                  secondary="매일 새로운 디지털 헬스케어 브랜드를 발굴하고 심층 분석합니다."
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>2</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="트렌드 리포트 발행"
                  secondary="디지털 헬스케어 시장의 최신 트렌드와 동향을 정기적으로 보고합니다."
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>3</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="전문가 인터뷰"
                  secondary="디지털 헬스케어 분야의 전문가와 혁신가들을 인터뷰하여 인사이트를 공유합니다."
                />
              </ListItem>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>4</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="사용자 리뷰 및 피드백"
                  secondary="실제 사용자들의 경험과 피드백을 수집하여 객관적인 정보를 제공합니다."
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default About;
