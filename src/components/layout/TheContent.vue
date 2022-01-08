<template lang="">
    <div class="content">
        <div class="m-row">
          <div class="m-form-group flex-5">
                <label class="m-input-label w-100" for="txtEmployeeCode">Câu đầu vào <span class="m-span-require">*</span></label>
                <input 
                    ref="FullName" 
                    v-model="inputSentence" 
                    tabindex="1"
                    class="m-input" style="width: 100%;" type="text"
                >
            </div>

            <div class="m-form-group flex-2 pl-25">
                <label class="m-input-label w-100" for="txtIdentityNumber">Thuật toán</label>
                <BaseComboBox
                    :options="algorithmOptions"
                    v-model="algorithm"
                    placeholder=''
                    :tabindex="5"
                />
            </div>
        </div>

        <div class="m-row">
          <div class="m-form-group flex-5">
                <label class="m-input-label w-100" for="txtEmployeeCode">Tập luật <span class="m-span-require">*</span></label>
                <div class="rule">
                  <div class="rule-action">
                    <button @click="showRuleDetail(myEnum.formMode.add, null)" class="m-btn m-btn-default">
                      Thêm
                    </button>

                    <button @click="btnFileInputOnclick" class="m-btn m-second-btn">
                        Chọn file
                    </button>

                    <input class="hide-file m-cursor-pointer" ref="fileInput" @change="onFileChange" type="file" name="file" id="file">
                    
                  </div>

                  <div class="rule-list">
                    <div class="rule-list-left">
                      <div 
                        v-for="(rule, index) in ruleLeft" :key="index" 
                        @click="showRuleDetail(myEnum.formMode.edit, { rule, index })"
                        class="rule-item m-cursor-pointer"
                      >
                        <div class="rule-item-text">{{ rule }}</div>
                        <div class="rule-item-action">
                          <div @click.stop="showRuleDetail(myEnum.formMode.edit, { rule, index })" class="m-table-action-icon icon-edit"></div>
                          <div @click.stop="btnDeleteOnClick(index)" class="m-table-action-icon icon-remove"></div>
                        </div>
                      </div>

                    </div>
                    
                    <div class="rule-list-right">
                      <div 
                        v-for="(rule, index) in ruleRight" :key="index" 
                        @click="showRuleDetail(myEnum.formMode.edit, { rule, index: index + ruleLeft.length })"
                        class="rule-item m-cursor-pointer"
                      >
                        <div class="rule-item-text">{{ rule }}</div>
                        <div class="rule-item-action">
                          <div @click.stop="showRuleDetail(myEnum.formMode.edit, { rule, index: index + ruleLeft.length })" class="m-table-action-icon icon-edit"></div>
                          <div @click.stop="btnDeleteOnClick(index + ruleLeft.length)" class="m-table-action-icon icon-remove"></div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
            </div>
        </div>

        <div class="m-row" style="height: 32px; padding-bottom: 12px;">
          <div class="btn-submit">
            <button @click="onBtnSubmitClick" class="m-btn m-btn-default">
              Phân tích
            </button>
          </div>
        </div>

        <!-- <div class="m-row">
          <div class="m-form-group flex-5">
                <label class="m-input-label w-100" for="txtEmployeeCode">Đầu ra</label>
                <div class="output">
                  <TreeChart :json="treeData" />
                </div>
            </div>
        </div> -->

        <!-- <div> -->
          <!-- <div > -->
                <label class="m-input-label w-100" for="txtEmployeeCode">Đầu ra</label>
                <div id="treeChart">
                  <!-- <TreeChart :json="treeData" /> -->
                </div>
            <!-- </div> -->
        <!-- </div> -->

        <!-- Dialog rule Info -->
        <RuleDetail 
            v-show="isShowRuleDetail" 
            :formMode="formMode"
            :ruleForEdit="ruleForEdit"
            @closeRuleDetail="closeRuleDetail"
            @addRule="addRule"
            @editRule="editRule"
        />
    </div>
</template>

<script>
import BaseComboBox from '../base/BaseComboBox.vue'
// import TreeChart from "vue-tree-chart";
import RuleDetail from './RuleDetail.vue'
import myEnum from "../../utils/enum.js";
import Toastify from "../../utils/toastify";
import cky from "../../utils/cky.js";
import earley from "../../utils/earley.js";

export default {
  name: "the-content",

  data() {
    return {
      inputSentence: "",
      algorithm: "",
      rules: [
        'S -> NP VP',
        'VP -> VP PP | V NP | V',
        'PP -> P NP',
        'NP -> Det N | N'
      ],

      treeData: {
        name: 'root',
        // image_url: "https://static.refined-x.com/avat.jpg",
        class: ["rootNode"],
        children: [
          {
            name: 'children1',
            // image_url: "https://static.refined-x.com/avat1.jpg"
          },
          {
            name: 'children2',
            // image_url: "https://static.refined-x.com/avat2.jpg",
            children: [
              {
                name: 'grandchild',
                // image_url: "https://static.refined-x.com/avat.jpg"
              },
              {
                name: 'grandchild2',
                // image_url: "https://static.refined-x.com/avat1.jpg"
              },
              {
                name: 'grandchild3',
                // image_url: "https://static.refined-x.com/avat2.jpg"
              }
            ]
          },
          {
            name: 'children3',
            // image_url: "https://static.refined-x.com/avat.jpg"
          }
        ]
      },

      isShowRuleDetail: false,
      formMode: myEnum.formMode.view,
      ruleForEdit: null,
      myEnum: myEnum,

      algorithmOptions: [
        { text: 'CYK', value: 0 },
        { text: 'Earley', value: 1 },
      ]
    }
  },

  computed: {
    ruleLeft: function() {
      return this.rules.slice(0, Math.floor(this.rules.length / 2))
    },

    ruleRight: function() {
      return this.rules.slice(Math.floor(this.rules.length / 2), this.rules.length)
    }
  },

  methods: {
    btnFileInputOnclick() {
      this.$refs.fileInput.click();
    },

    /**
     * Method mở dialog rule theo form mode
     * Author: LMDuc (19/11/2021)
     */
    showRuleDetail(formMode, ruleObject) {
      console.log("object")
      this.formMode = formMode;
      this.ruleForEdit = ruleObject;

      this.isShowRuleDetail = true;
    },

    /**
     * Method để đóng dialog thông tin rule
     * Author: LMDuc (19/11/2021)
     */
    closeRuleDetail() {
      this.formMode = myEnum.formMode.view;
      this.isShowRuleDetail = false;
    },

    addRule(rule) {
      this.rules.unshift(rule);

      // Show toast
      Toastify.showToastMsg({
          msg: "Thêm luật mới thành công",
          type: myEnum.toastType.success
      });

      this.closeRuleDetail();
    },

    editRule(index, newRule) {
      this.$set(this.rules, index, newRule);

      // Show toast
      Toastify.showToastMsg({
          msg: "Sủa luật thành công",
          type: myEnum.toastType.success
      });

      this.closeRuleDetail();
    },

    btnDeleteOnClick(index) {
      if (index !== null && index !== undefined) {
        // Hiển thị cảnh báo cho ngươi dùng biết
        Toastify.showPopupMsg({
          yesCallback: () => this.deleteRule(index),
          title: "",
          iShowBtnNo: true,
          msg: 'Bạn có chắc chắn muốn xóa luật này không',
        });
      } else {
        console.log();
      }
    },

    deleteRule(index) {
      this.rules.splice(index, 1);

      // Show toast
      Toastify.showToastMsg({
          msg: "Xóa luật thành công",
          type: myEnum.toastType.success
      });
    },

    onBtnSubmitClick() {
      if (this.algorithm === 0) {
        cky(this.rules, this.inputSentence);
      }
      else if (this.algorithm === 1) {
        earley(this.rules, this.inputSentence)
      }

      console.log({
        inputSentence: this.inputSentence,
        algorithm: this.algorithm,
        rules: this.rules,        
      })
    },

    onFileChange(e) {
      let me = this;
      var file = e.target.files[0];

      var reader = new FileReader();
      reader.onload = function(){
        // Entire file
        console.log(this.result);

        // By lines
        var lines = this.result.split('\n');

        me.rules = lines;
        // for(var line = 0; line < lines.length; line++){
        //   console.log(lines[line]);
          
        // }
      };
      reader.readAsText(file);
    }
  },

  components: {
    BaseComboBox,
    // TreeChart,
    RuleDetail,
  }
};
</script>

<style scope>
@import url("../../styles/common/content.css");

.avat {
  display: none !important;
}
</style>