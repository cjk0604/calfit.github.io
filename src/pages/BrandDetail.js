import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Chip, 
  Divider, 
  Button, 
  Card, 
  CardContent, 
  CardMedia, 
  Rating, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Paper,
  Breadcrumbs,
  Avatar,
  IconButton,
  useTheme
} from '@mui/material';
import { 
  CheckCircle as CheckIcon,
  Language as WebsiteIcon,
  Business as BusinessIcon,
  DateRange as DateIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  NavigateNext as NavigateNextIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

// Import mock data
import { brands } from '../data/brands';

const BrandDetail = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [relatedBrands, setRelatedBrands] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    // Find the brand with the matching ID
    const brandId = parseInt(id);
    const foundBrand = brands.find(b => b.id === brandId);
    
    if (foundBrand) {
      setBrand(foundBrand);
      
      // Find related brands
      if (foundBrand.relatedBrands && foundBrand.relatedBrands.length > 0) {
        const related = brands.filter(b => foundBrand.relatedBrands.includes(b.id));
        setRelatedBrands(related);
      }
    }
    
    // Scroll to top when brand changes
    window.scrollTo(0, 0);
  }, [id]);

  if (!brand) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8, textAlign: 'center' }}>
        <Typography variant="h4">브랜드를 찾을 수 없습니다.</Typography>
        <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
          홈으로 돌아가기
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <Link to="/" style={{ color: theme.palette.text.secondary, textDecoration: 'none' }}>
          홈
        </Link>
        <Link to={`/category/${brand.category}`} style={{ color: theme.palette.text.secondary, textDecoration: 'none' }}>
          {brand.category}
        </Link>
        <Typography color="text.primary">{brand.name}</Typography>
      </Breadcrumbs>

      {/* Brand Header */}
      <Box sx={{ mb: 5 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
              {brand.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
              {brand.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 2 }}>
              <Chip 
                label={brand.category} 
                color="primary" 
                variant="outlined" 
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating value={brand.rating} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({brand.reviews} 리뷰)
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button 
                variant="contained" 
                startIcon={<WebsiteIcon />}
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                웹사이트 방문
              </Button>
              <IconButton aria-label="share" sx={{ border: '1px solid', borderColor: 'divider' }}>
                <ShareIcon />
              </IconButton>
              <IconButton aria-label="bookmark" sx={{ border: '1px solid', borderColor: 'divider' }}>
                <BookmarkIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: { xs: 'center', md: 'flex-end' },
                mb: { xs: 2, md: 0 }
              }}
            >
              <Avatar 
                src={brand.logo} 
                alt={brand.name} 
                variant="rounded"
                sx={{ 
                  width: { xs: 120, md: 180 }, 
                  height: { xs: 120, md: 180 },
                  boxShadow: 2
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 5 }} />

      {/* Brand Info and Content */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {/* Main Content */}
          <Typography variant="h5" gutterBottom fontWeight="bold">
            브랜드 소개
          </Typography>
          <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
            {brand.content}
          </Typography>

          {/* Key Features */}
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              주요 특징
            </Typography>
            <List>
              {brand.keyFeatures.map((feature, index) => (
                <ListItem key={index} disableGutters>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CheckIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Brand Info Card */}
          <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" gutterBottom>
              기업 정보
            </Typography>
            <List disablePadding>
              <ListItem disableGutters sx={{ py: 1 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <DateIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="설립년도" 
                  secondary={brand.founded} 
                  primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                  secondaryTypographyProps={{ variant: 'body1' }}
                />
              </ListItem>
              <ListItem disableGutters sx={{ py: 1 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <BusinessIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="본사 위치" 
                  secondary={brand.headquarters} 
                  primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                  secondaryTypographyProps={{ variant: 'body1' }}
                />
              </ListItem>
              <ListItem disableGutters sx={{ py: 1 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <WebsiteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="웹사이트" 
                  secondary={
                    <Link 
                      href={brand.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: theme.palette.primary.main }}
                    >
                      {brand.website.replace('https://', '')}
                    </Link>
                  } 
                  primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                  secondaryTypographyProps={{ variant: 'body1' }}
                />
              </ListItem>
            </List>
          </Paper>

          {/* Related Brands */}
          {relatedBrands.length > 0 && (
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h6" gutterBottom>
                관련 브랜드
              </Typography>
              <Grid container spacing={2}>
                {relatedBrands.map((relatedBrand) => (
                  <Grid item xs={12} key={relatedBrand.id}>
                    <Card 
                      component={Link}
                      to={`/brand/${relatedBrand.id}`}
                      sx={{ 
                        display: 'flex', 
                        textDecoration: 'none',
                        '&:hover': {
                          boxShadow: 2
                        }
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 80 }}
                        image={relatedBrand.logo}
                        alt={relatedBrand.name}
                      />
                      <CardContent sx={{ flex: '1 0 auto', py: 1 }}>
                        <Typography variant="subtitle1" component="div">
                          {relatedBrand.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {relatedBrand.category}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}
        </Grid>
      </Grid>

      {/* Back to Home Button */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Button 
          component={Link} 
          to="/" 
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          모든 브랜드 보기
        </Button>
      </Box>
    </Container>
  );
};

export default BrandDetail;
