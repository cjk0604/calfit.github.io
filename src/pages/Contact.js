import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  TextField, 
  Button, 
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert,
  useTheme
} from '@mui/material';
import { 
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon
} from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: '일반 문의'
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = '제목을 입력해주세요';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = '메시지를 입력해주세요';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would send the form data to a server here
      console.log('Form submitted:', formData);
      
      // Show success message
      setSnackbar({
        open: true,
        message: '메시지가 성공적으로 전송되었습니다. 곧 연락드리겠습니다.',
        severity: 'success'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: '일반 문의'
      });
    } else {
      setSnackbar({
        open: true,
        message: '양식을 올바르게 작성해주세요.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          문의하기
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph sx={{ maxWidth: '800px', mx: 'auto' }}>
          질문이나 제안, 협업 제안 등 어떤 내용이든 편하게 문의해주세요.
          빠른 시일 내에 답변 드리겠습니다.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: { xs: 4, md: 0 } }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              연락처 정보
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              아래 연락처로 직접 문의하시거나, 옆의 양식을 작성해주세요.
            </Typography>
            
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                mb: 3, 
                display: 'flex', 
                alignItems: 'flex-start',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <EmailIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  이메일
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  info@healthtechinsight.kr
                </Typography>
              </Box>
            </Paper>
            
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                mb: 3, 
                display: 'flex', 
                alignItems: 'flex-start',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <PhoneIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  전화번호
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  02-123-4567
                </Typography>
              </Box>
            </Paper>
            
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                display: 'flex', 
                alignItems: 'flex-start',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <LocationIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  주소
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  서울특별시 강남구 테헤란로 123<br />
                  디지털타워 8층
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="h5" gutterBottom fontWeight="bold">
              문의 양식
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              아래 양식을 작성하여 문의해주세요. * 표시는 필수 입력 항목입니다.
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="이름"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="이메일"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="제목"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={!!errors.subject}
                    helperText={errors.subject}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset" sx={{ mb: 2 }}>
                    <FormLabel component="legend">문의 유형</FormLabel>
                    <RadioGroup
                      row
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="일반 문의" control={<Radio />} label="일반 문의" />
                      <FormControlLabel value="브랜드 제안" control={<Radio />} label="브랜드 제안" />
                      <FormControlLabel value="협업 제안" control={<Radio />} label="협업 제안" />
                      <FormControlLabel value="기타" control={<Radio />} label="기타" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={6}
                    label="메시지"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<SendIcon />}
                    sx={{ 
                      mt: 2,
                      bgcolor: theme.palette.primary.main,
                      '&:hover': {
                        bgcolor: theme.palette.primary.dark,
                      }
                    }}
                  >
                    메시지 보내기
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Map Section */}
      <Box sx={{ mt: 8, height: 400, borderRadius: 2, overflow: 'hidden' }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          찾아오시는 길
        </Typography>
        <Box 
          component="iframe" 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.346948979152!2d127.02829731558675!3d37.50068623549901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca15a2f9719ab%3A0x20210a76b2b256f7!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOq1rCDthYztl6TroZwyOOq4uCA3!5e0!3m2!1sko!2skr!4v1623123456789!5m2!1sko!2skr" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>

      {/* Snackbar for form submission feedback */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
