import Mock from 'mockjs';

import './user';
import './message';
import '@/views/cashier/mock';
import '@/views/pending/mock';

Mock.setup({
  timeout: '600-1000',
});
