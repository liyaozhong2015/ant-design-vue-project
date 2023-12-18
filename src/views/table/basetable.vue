<template>
    <div>
        <h2>信息列表</h2>
        <a-divider />
    <div class="table-operations">
        <table>
            <tr>
                <td>
                    <a-button @click="showModal" icon="plus" type="link">
                        增加
                    </a-button>
                    <a-button @click="clearFilters" icon="edit" type="link">
                        修改
                    </a-button>
                    <a-button @click="clearAll" icon="delete" type="link">
                        删除
                    </a-button>
                    <a-button  @click="clearAll" type="link" icon="export">
                    导出
                    </a-button>
                </td>
                <td>
                    <a-input-group compact style="margin-left: 50px;">
                    <a-select default-value="Sign Up">
                        <a-select-option value="Sign Up">
                        Sign Up
                        </a-select-option>
                        <a-select-option value="Sign In">
                        Sign In
                        </a-select-option>
                    </a-select>
                    <a-auto-complete
                        :data-source="dataSource"
                        style="width: 200px"
                        placeholder="Email"
                        @change="handleChange"
                    />
                    </a-input-group>
                </td>
                <td>
                    <a-button @click="clearAll" icon="search" type="primary" style="margin-left: 20px;display: inline;">
                        查找
                    </a-button>
                </td>
            </tr>
        </table>
    </div>
    <a-table :row-selection="rowSelection" :columns="columns" :data-source="data" />
    <a-modal v-model="visible" width="80%" title="增加表格数据" @ok="handleOk">
      <div>
        <a-form :form="addform"  @submit="handleSubmit"  style="width: 400px;">
            <a-form-item >
            <span slot="label">
              姓名&nbsp;
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
          <a-form-item >
            <span slot="label">
              年龄&nbsp;
            </span>
            <a-input
              v-decorator="[
                'age',
                {
                  rules: [{ required: true, message: '请输入年龄!', whitespace: true }],
                },
              ]"
            />
          </a-form-item>
          <a-form-item >
            <span slot="label">
              地址&nbsp;
            </span>
            <a-input
              v-decorator="[
                'address',
                {
                  rules: [{ required: true, message: '请输入地址!', whitespace: true }],
                },
              ]"
            />
          </a-form-item>           
          <a-form-item >
            <span slot="label">
              出生日期&nbsp;
            </span>
            <a-date-picker 
              v-decorator="['date-picker', config]"
            >
            <template slot="renderExtraFooter">
              extra footer
            </template>
            </a-date-picker>
          </a-form-item>
      </a-form>
      </div>
    </a-modal>
  </div>
    
  </template>
  <script>
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
  ];
  
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
  
  export default {
    data() {
        return {
              config: {
              rules: [{ type: 'object', required: true, message: 'Please select time!' }],
               },
              data,
              columns,
              selectedRowKeys: [], // Check here to configure the default column
              dataSource: [],
              visible:false,
          };
    },
    computed: {
          rowSelection() {
              const { selectedRowKeys } = this;
              return {
                  selectedRowKeys,
                  onChange: this.onSelectChange,
                  hideDefaultSelections: true,
                  selections: [
                      {
                          key: 'all-data',
                          text: 'Select All Data',
                          onSelect: () => {
                              this.selectedRowKeys = [...Array(46).keys()]; // 0...45
                          },
                      },
                      {
                          key: 'odd',
                          text: 'Select Odd Row',
                          onSelect: changableRowKeys => {
                              let newSelectedRowKeys = [];
                              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                                  if (index % 2 !== 0) {
                                      return false;
                                  }
                                  return true;
                              });
                              this.selectedRowKeys = newSelectedRowKeys;
                          },
                      },
                      {
                          key: 'even',
                          text: 'Select Even Row',
                          onSelect: changableRowKeys => {
                              let newSelectedRowKeys = [];
                              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                                  if (index % 2 !== 0) {
                                      return true;
                                  }
                                  return false;
                              });
                              this.selectedRowKeys = newSelectedRowKeys;
                          },
                      },
                  ],
                  onSelection: this.onSelection,
              };
          },
    },
    beforeCreate() {
    this.addform = this.$form.createForm(this, { name: 'register' });
  },
    methods: {
      handleSubmit(e) {
      //e.preventDefault();
      this.addform.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
          onSelectChange(selectedRowKeys) {
              console.log('selectedRowKeys changed: ', selectedRowKeys);
              this.selectedRowKeys = selectedRowKeys;
          },
          clearFilters() {
              this.filteredInfo = null;
          },
          clearAll() {
              this.filteredInfo = null;
              this.sortedInfo = null;
          },
          setAgeSort() {
              this.sortedInfo = {
                  order: 'descend',
                  columnKey: 'age',
              }
          },
          handleChange(value) {
          this.dataSource =
          !value || value.indexOf('@') >= 0
          ? []
          : [`${value}@gmail.com`, `${value}@163.com`, `${value}@qq.com`];
          },
        showModal() {
          this.addform = this.$form.createForm(this, { name: 'register' });
          this.visible = true;
         },
         handleOk(e) {
                e.preventDefault();
                this.addform.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        this.visible = false;
                    }
                      else { 
                        
                      }
                  });
                 
         },
  }
}
  </script>
  <style scoped>
  .table-operations {
    margin-bottom: 16px;
  }
  
  .table-operations > button {
    margin-right: 8px;
  }
  </style>