import React from 'react';
import { ConfigProvider } from 'antd';

import { FormCourse } from './FormCourse';

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <FormCourse />
    </ConfigProvider>
  );
}

export default App;
