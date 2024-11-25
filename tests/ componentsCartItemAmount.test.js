import { render, screen } from '@testing-library/vue';
import { createPinia, setActivePinia } from 'pinia'; // 导入 Pinia
import CardItemAmount from '@/views/cashier/components/counter/cart-item-amount.vue';

test('renders the CardItemAmount', () => {
  const pinia = createPinia();
  setActivePinia(pinia);
  // test
  const total_amount = 100;
  const start = false;
  const cashierInfo = {
    staff_name: 'Vica Zhuo',
    avatar: "https://multi-store.crmeb.net/view_cashier/img/yonghu.908b01d3.png"
  };
  const setNewCashier = function () {
    console.log('setNewCashier');
  }; 
  render(CardItemAmount, {
    plugins: [pinia], // 注入 Pinia 实例
    props: { total_amount, start, cashierInfo, setNewCashier }, // 直接传递 props
    global: {
      mocks: {
        $t: (key) => key, // 模拟 $t 函数
      },
    },
  });
  // test 123
  expect(screen.getByText('100')).toBeInTheDocument();
  expect(screen.getByText('Vica Zhuo')).toBeInTheDocument();
});
