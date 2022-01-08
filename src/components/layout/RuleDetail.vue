<template>
    <!-- Dialog -->
    <div class="m-dialog">
        <div class="m-dialog-modal"></div>

        <div class="m-dialog-box">
            <!-- Header -->
            <div class="m-dialog-header">
                <div tabindex="13" v-on:keyup.space="btnCloseOnClick" @click="btnCloseOnClick" class="m-dialog-header-icon m-dialog-header-icon-close icon-close m-cursor-pointer"></div>
                <div tabindex="14" class="m-dialog-header-icon m-dialog-header-icon-help icon-green-help m-cursor-pointer"></div>
            </div>

            <!-- Content -->
            <div class="m-dialog-content">

                <div class="m-dialog-content-right">

                    <div class="m-dialog-content-info">
                        <div class="m-infor-title">Thêm luật mới</div>

                        <div class="form-info">
                            <div class="m-row">
                                <div class="m-form-group flex tooltip">
                                    <label class="m-input-label w-110" for="txtEmployeeCode">Nội dung luật <span class="m-span-require">*</span></label>
                                    <input 
                                        ref="rule" 
                                        v-model="rule" 
                                        :class="{ 'm-input-invalid': errorMessage }"
                                        tabindex="1"
                                        class="m-input" style="width: 435px;" type="text"
                                    >
                                    <span v-if="errorMessage" class="tooltiptext tooltip-right">{{ errorMessage }}</span>
                                </div>
                            </div>

                        </div>
                        
                    </div>
                                        
                </div>
            </div>

            <!-- Footer -->
            <div class="m-dialog-footer">
                <div class="m-dialog-footer-button">
                    <button tabindex="12" @click="btnCloseOnClick" class="m-btn m-second-btn">
                        Đóng
                    </button>
                    <button tabindex="11" @click="btnSaveOnClick" class="m-btn m-btn-default">
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import myEnum from '../../utils/enum.js'

export default {
    name: 'rule-detail',

    components: {
    },

    data() {
        return {
            rule: '',
            errorMessage: ''
        };
    },

    props: {
        formMode: {
            type: Number,
            default: myEnum.formMode.view,
        },

        ruleForEdit: {
            type: Object,
            default: null,
        }
    },

    methods: {
        /**
         * Sự kiện khi click vào button close
         * Author: LMDuc (22/11/2021)
         */
        btnCloseOnClick() {
            this.$emit('closeRuleDetail')
        },
        
        /**
         * Sự kiện khi click vào button save
         * Author: LMDuc (16/11/2021)
         */
        btnSaveOnClick() {
            try {
                // Validate dữ liệu
                if (!this.validateInput()) {
                    return;
                }

                let rule = this.rule;
                if (this.formMode === myEnum.formMode.add) {
                    this.$emit('addRule', rule);
                }
                else if (this.formMode === myEnum.formMode.edit) {
                    this.$emit('editRule', this.ruleForEdit.index, rule);
                }
            } catch (error) {
                console.log(error)
            }
        },

        /**
         * Method để validate dữ liệu đầu vào
         * Author: LMDuc (20/11/2021)
         */
        validateInput() {
            let refElements = this.$refs;

            if (!this.validateRule()) {
                refElements.rule.focus();
                return false;
            }

            return true;
        },

        /**
         * Method để validate rule
         * Author: LMDuc (20/11/2021)
         */
        validateRule() {
            if (!this.rule) {
                this.errorMessage = "Nội dung luật không được bỏ trống";
                return false;
            }

            this.errorMessage = "";
            return true;
        },

    },

    watch: {
        formMode: function (formModeValue) {
            let me = this;

            // Clean error message
            me.errorMessage = ''

            if (formModeValue === myEnum.formMode.add) {
                // Clean form khi mở form để add
                me.rule = '';
            } 
            else if (formModeValue === myEnum.formMode.edit) {
                if (!this.ruleForEdit) {
                    return;
                }
                
                me.rule = me.ruleForEdit.rule;
            }
        },

        rule: function() {
            this.validateRule();
        },
    }
}
</script>

<style scope>
    @import url("../../styles/component/dialog.css");

    /* Style cho date picker riêng trang này */
    .m-form-group .mx-datepicker {
        width: 168px;
        height: 32px;
    }
</style>