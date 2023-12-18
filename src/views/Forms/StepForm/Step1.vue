<template>
  <div>
   <a-form layout="horizontal" :form="payform" >
    <a-form-item
     label="付款账号"
     :label-col="formItemLayout.labelCol"
     :wrapper-col="formItemLayout.wrapperCol">
     <a-input
              v-decorator="[
                'payAccount',
                {
                  initialValue:step.payAccount,
                  rules: [{ required: true, message: '请输入付款账号!', whitespace: true }],
                },
              ]"
              placeholder="请输入付款账号"
            />
    </a-form-item>
    <a-form-item
     label="收款账号"
     :label-col="formItemLayout.labelCol"
     :wrapper-col="formItemLayout.wrapperCol">
     <ReceiveAccount
              v-decorator="[
                'receiveAccount',
                {
                  initialValue:step.receiveAccount,
                  rules: [{ 
                    required: true, 
                    message: '请输入收款账号!',
                    validator:(rule,value,callback)=>{
                      if(value&&value.number){
                        callback();
                      }else{
                        callback(false);
                      }
                    }
                  
                  }],
                },
              ]"
            />
    </a-form-item>
   <a-form-item>
     <a-button type="primary"  @click="handSubmit">下一步</a-button>
   </a-form-item>
   </a-form>
  </div>
</template>

<script>
import ReceiveAccount from "@/components/ReceiverAccount"
export default {
  components: { 
    ReceiveAccount,
  },
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

    handSubmit(e) { 
      e.preventDefault();
      const { payform, $router, $store } = this;
      payform.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                      $store.commit({
                        type: "form/saveStepFormData",
                        payload: values
                      });
                      $router.push("/form/step-form/confirm");
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