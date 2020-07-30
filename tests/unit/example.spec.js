import { mount } from '@vue/test-utils';
import ScrollComponent from '@/components/ScrollComponent.vue';

const getUsers = async () => {
  const returnArr = [];
  for (let i = 0; i < 50; i += 1) {
    returnArr.push({
      id: Math.ceil(Math.random() * 100000),
      name: '测试',
    });
  }
  return returnArr;
};

describe('ScrollComponent.vue', () => {
  it('list loaded', async () => {
    const wrapper = mount(ScrollComponent, {
      propsData: { scrollReq: getUsers },
    });
    const { vm } = wrapper;
    await vm.$nextTick();
    const li = wrapper.findAll('li').at(49);
    expect(li.is('li')).toBe(true);
    expect(li.text()).toMatch('测试');
  });
});
