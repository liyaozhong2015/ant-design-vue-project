<template>
  <div>
   <a-form layout="horizontal" :form="payform" >
    <a-form-item
     label="密码"
     :label-col="formItemLayout.labelCol"
     :wrapper-col="formItemLayout.wrapperCol">
     {{ step.payAccount }}
    </a-form-item>
   <a-form-item>
    <a-input
              v-decorator="[
                'password',
                {
                  rules: [{ required: true, message: '请输入密码!', whitespace: true }],
                },
              ]"
              type="password"
              placeholder="请输入付款密码"
            />
    </a-form-item>
   <a-form-item>
     <a-button type="primary"  @click="handSubmit">提交</a-button>
     <a-button style="margin-left: 8px;"  @click="btPre">上一步</a-button>
   </a-form-item>
   </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  computed:{ 
    step() { 
      return this.$store.state.form.step;
    }
  },
  mounted() {
    
  },
  beforeCreate() { 
    this.payform = this.$form.createForm(this);
  },
  methods: {
    btPre() { 
      this.$router.push("/form/step-form/info");
    },

    handSubmit(e) { 
      e.preventDefault();
      const { payform, $store ,step} = this;
      payform.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                      $store.dispatch({
                        type: "form/submitStepForm",
                        payload: {...step,...values}
                      });
                      
                    }
                      else { 
                        
                      }
                  });
    }
  },
}
</script>

<style scoped >
</style>