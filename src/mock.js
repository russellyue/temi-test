import Mock, { Random } from 'mockjs';

// 引入random对象,随机生成数据的对象，（与占位符@一样）
Mock.setup({
  timeout: 200, // 设置请求延时时间
});
const getUser = () => { // 定义请求数据方法
  const datalist = [];
  for (let i = 0; i < 50; i += 1) {
    datalist.push({
      id: Random.id(),
      name: Random.cname(),
    });
  }
  return {
    users: datalist,
  };
};
Mock.mock('/users', /post|get/i, getUser);
