<template>
  <div 
    v-on:keyup.space="open = !open"
    v-on:keyup.down="onKeyDownUp"
    v-on:keyup.up="onKeyUpUp"
    v-on:keyup.enter="onItemClick(options[target])"
    :tabindex="tabindex" 
    @focusout="handleFocusout" 
    class="m-combobox" style="width: 100%;"
  >
    <input  :value="selected ? selected.text : ''" type="text" class="m-combobox-input" :placeholder="placeholder">
    <button @click="open = !open" class="m-combobox-button icon-chevron"></button>

    <div 
      v-show="open" 
      :class="{ 'm-combobox-select-top': isSelectTop }"
      class="m-combobox-select"
    >
        <div 
          v-for="(option, index) of options"
          :key="index"
          :class="{'m-item-selected': option.value === (selected ? selected.value : '')}"
          @click="onItemClick(option)"
          class="m-checkbox m-combobox-item"
        >
            <div class="checkbox-text">{{ option.text }}</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "combo-box",

  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: [Number, String, Object],
    },
    placeholder: {
      type: String,
      default: ''
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    isSelectTop: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      selected: this.options && this.options.length ? this.options[0] : { text: '', value: '' },
      target: 0,
      open: false,
    };
  },

  methods: {
    /**
     * Method thực hiện chọn 1 item
     * Author: LMDuc (21/11/2021)
     */
    onItemClick(option) {
      this.selected = option;
      this.open = false;
      this.$emit('input', option.value);
    },

    /**
     * Mehtod thực hiện khi focus out ra khỏi combobox
     * Author: LMDuc (21/11/2021)
     */
    handleFocusout(e) {
      // if the blur was because of outside focus
      // currentTarget is the parent element, relatedTarget is the clicked element
      if (!e.currentTarget.contains(e.relatedTarget)) {
          this.open = false;
      }
    },

    /**
     * Method xử lý sự kiện khi nhấn vào key down
     * Author: LMDuc (21/11/2021)
     */
    onKeyDownUp() {
      if (this.target == this.options.length - 1) {
        this.target = 0
      } else {
        this.target++;
      }
    },

    /**
     * Method xử lý sự kiện khi nhấn vào key up
     * Author: LMDuc (21/11/2021)
     */
    onKeyUpUp() {
      if (this.target == 0) {
        this.target = this.options.length - 1
      } else {
        this.target--;
      }
    }
  },

  mounted() {
    this.$emit("input", this.selected.value);
  },

  watch: {
    value: function(value) {
      let optionSelected = null;
      if (value !== null && value !== undefined && this.options && this.options.length > 0) {
        const options = this.options.filter(option => option.value === this.value);
        optionSelected = options[0] ? options[0]
          : { text: '', value: '' };
      }

      this.selected = optionSelected;

      console.log("value: ", value);
    }
  },
};
</script>

<style scoped>
</style>