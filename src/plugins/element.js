import Vue from 'vue';

//导入弹框提示组件
import { Message, Form, FormItem, Input, Button } from 'element-ui';

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.prototype.$message = Message;

