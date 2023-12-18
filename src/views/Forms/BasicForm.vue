<template>
  <div>
    <h2>用户注册</h2>
    <a-divider />
    <table>
      <tr>
        <td style="padding-left: 50px;">
          

          <a-form :form="form" @submit="handleSubmit">
            <a-form-item v-bind="formItemLayout">
            <span slot="label">
              用户名&nbsp;
            </span>
            <a-input
              v-decorator="[
                'nickname',
                {
                  rules: [{ required: true, message: '请输入姓名!', whitespace: true }],
                },
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="邮箱">
            <a-input
              v-decorator="[
                'email',
                {
                  rules: [
                    {
                      type: 'email',
                      message: '请输入正确邮箱格式!',
                    },
                    {
                      required: true,
                      message: '请输入邮箱!',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入密码!',
                    },
                    {
                      validator: validateToNextPassword,
                    },
                  ],
                },
              ]"
              type="password"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
            <a-input
              v-decorator="[
                'confirm',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    {
                      validator: compareToFirstPassword,
                    },
                  ],
                },
              ]"
              type="password"
              @blur="handleConfirmBlur"
            />
          </a-form-item>

          
          <a-form-item v-bind="formItemLayout" label="手机号码">
            <a-input
              v-decorator="[
                'phone',
                {
                  rules: [{ required: true, message: 'Please input your phone number!' }],
                },
              ]"
              style="width: 100%"
            >
              <a-select
                slot="addonBefore"
                v-decorator="['prefix', { initialValue: '86' }]"
                style="width: 70px"
              >
                <a-select-option value="86">
                  +86
                </a-select-option>
                <a-select-option value="87">
                  +87
                </a-select-option>
              </a-select>
            </a-input>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="个人主页">
            <a-auto-complete
              v-decorator="['website', { rules: [{ required: true, message: '请输入个人网页地址!' }] }]"
              placeholder="website"
              @change="handleWebsiteChange"
            >
              <template slot="dataSource">
                <a-select-option v-for="website in autoCompleteResult" :key="website">
                  {{ website }}
                </a-select-option>
              </template>
              <a-input />
            </a-auto-complete>
          </a-form-item>
          <a-form-item v-bind="formItemLayout">
            <span slot="label">
              出生日期&nbsp;
            </span>
            <a-date-picker >
            <template slot="renderExtraFooter">
              extra footer
            </template>
            </a-date-picker>
          </a-form-item>
          <a-form-item v-bind="formItemLayout">
            <span slot="label">
              上传身份证&nbsp;
            </span>
            <a-button icon="upload"   style="margin-right: 8px" @click="uploadResult">
            上传
          </a-button>



          <a-modal v-model="uploadResultVisible" @cancel="cancel" :okText="'提交'" :cancelText="'取消'" title="上传文件" @ok="handleOk">
          <a-upload-dragger
            name="file"
            :multiple="true"
            :fileList="fileList"
            @download="handleDownload"
            :remove="removefiles"
            @change="handleChange"
            :beforeUpload="beforeUpload"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="container" />
            </p>
            <p class="ant-upload-text">
              点击或将文件拖拽到这里上传
            </p>
            <p class="ant-upload-hint">
              支持扩展名：待定
            </p>
          </a-upload-dragger>
          </a-modal>



          </a-form-item>
          
          <a-form-item v-bind="formItemLayout">
            
          </a-form-item>
          <a-form-item v-bind="tailFormItemLayout">
            <a-button type="primary" html-type="submit">
              注册
            </a-button>
            <a-button   @click="success" style="margin-left: 20px;">
              取消
            </a-button>
          </a-form-item>
        </a-form>
        </td>
      </tr>
    </table>

    
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:99/';
import moment from 'moment';
const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

export default {
      name: "UploadFile",
      data(){
        return{
          // 将数组文件变成受控，必须设置，否则会用组件默认的
          fileList:[],
          // 控制弹框的状态
          uploadResultVisible: false,
          confirmDirty: false,
          residences,
          autoCompleteResult: [],
          formItemLayout: {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          },
          tailFormItemLayout: {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
          },
        }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    success() {
      this.$success({
        title: 'This is a success message',
        // JSX support
        content: h=>(
          <div>
            <p>some messages...some messages...</p>
            <p>some messages...some messages...</p>
          </div>
        ),
      });
    },

    openNotificationWithIcon(type, title, content) {
    this.$notification[type]({
      message: title,
      description: content
    });
  },
    moment,
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf('day');
    },

    disabledDateTime() {
      return {
        disabledHours: () => this.range(0, 24).splice(4, 20),
        disabledMinutes: () => this.range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    handleWebsiteChange(value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.autoCompleteResult = autoCompleteResult;
    },
        // 点击上传按钮显示弹框
      uploadResult(){
        this.uploadResultVisible = true
      },
      // 点击取消清空文件列表
      cancel(){
        this.fileList = []
    },
    //隐藏窗体清空文件
    cancelClear() { 
      this.uploadResultVisible = true;
      this.fileList = [];
    },

      // 点击提交按钮调接口并关闭弹框
      handleOk(e) {
        console.log(e);
        // 同时传多个文件并一起传递给后台，需要用formData来承载
        var formData = new FormData()
        for (const item of this.fileList) {
          // 追加数据
          formData.append('files', item)
          console.log(formData.get("files"));
          // set和append作用差不多，set会覆盖之前的
          formData.set('userId', this.taskId)
        }
        let config = {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    };
        // 调接口
            var that = this;
            axios(
            {
              method:"post",
              url:'/WeatherForecast/uploads', 
              data:formData, 
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }).then((response) => {
                that.fileList = [];
                that.uploadResultVisible = false;
              console.log(response)

              that.openNotificationWithIcon('success','通知','上传成功！')
                /* this.$notification['success']({
                  message: '通知',
                  description:
                    '上传成功！',
                }); */
            }).catch(function (error) {
                that.fileList = [];
                that.uploadResultVisible = false;
                console.log(error)
            })
    
        /* axios.post("/WeatherForecast/uploads", formData, config)
            .then(function (response) {
              if (response.status === 200) {
                console.log(response.data);
                amp.fileList = [];
                amp.uploadResultVisible = false;
                }
            }).catch(function (error) {
              amp.fileList = [];
              amp.uploadResultVisible = false;
              console.log(error)
                }) */
    },
      
      // 文件下载
      handleDownload (file) {
        console.log(file)
        this.$message.warn('您点击了下载')
      },

      // 点垃圾桶触发的事件(删除文件)
      removefiles(file) {
        console.log(file,this.fileList)   //file代表点击的文件，this.fileList代表总上传数
        // 通过文件的 uid对比 确定具体删除哪一个
        this.fileList.forEach((item,index)=>{
          if (item.uid === file.uid) {
            this.fileList.splice(index, 1)
            console.log(this.fileList)
          }
        })
      },
      // 文件状态改变时触发的事件
      handleChange(info) {
        console.log(info)
        const status = info.file.status;
        console.log(status)
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          this.$message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          this.$message.error(`${info.file.name} file upload failed.`);
        }
      },
      // 上传前触发的事件
      beforeUpload(file, fileList) {
        const fileType = file.name.replace(/.+\./, '');
        const fileFormat =
          fileType === 'zip' ||
          fileType === 'rar' ||
          fileType === 'pdf' ||
          fileType === 'docx' ||
          fileType === 'doc' ||
          fileType === 'png' ||
          fileType === 'jpg' ||
          fileType === 'jpeg';
        const fileSize = file.size !== 0;
        console.log(fileSize)
        if (!fileFormat) {
          fileList.splice(fileList.indexOf(file),1);
          this.$message.error('只能上传rar、zip、doc、docx、pdf、jpg 格式的文件');
          return false;
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
          fileList.splice(fileList.indexOf(file),1);
          this.$message.error('文件大小不能超过10MB!');
          return false;
        }
        if (!fileSize) {
          fileList.splice(fileList.indexOf(file),1);
          this.$message.error('不能上传空文件!');
          return false;
        }

        // 最多上传10个
        if(this.fileList.length<10){
          this.fileList.push(file)
          console.log(this.fileList)
        }else {
          this.$message.warning(`最多上传10个文件`);
        }
        return false  //暂时不保存  必须写上，不然会请求地址栏的地址
      },

    }
  }
</script>

<style scoped>

</style>
