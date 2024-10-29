// resizeDirective.js
export default {
  beforeMount(el, binding) {
    const updateHeight = () => {
      const height = window.innerHeight - binding.value; // 根据传入的百分比计算
      el.style.height = `${height}px`; // 设置元素的高度
      el.style.minHeight = `200px`; // 设置元素的高度
    };

    window.addEventListener('resize', updateHeight);
    updateHeight(); // 初始化高度
    el._onResize = updateHeight; // 存储引用
  },
  unmounted(el) {
    window.removeEventListener('resize', el._onResize);
    delete el._onResize; // 清理引用
  }
};
