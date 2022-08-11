<template>
  <div>
    <a-drawer
      title="Create a new account"
      :width="720"
      :visible="visibleDrawer"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
    >
      <a-form :model="form" :rules="rules" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Account Number" name="accNumber">
              <a-input
                v-model:value="form.accNumber"
                type="number"
                placeholder="Please enter user Account Number"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="Money" name="money">
              <a-input
                v-model:value="form.money"
                type="number"
                placeholder="Please enter money you use"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Bank Name" name="bankName">
              <a-select
                v-model:value="form.bankName"
                placeholder="Please a-s an bankName"
              >
                <a-select-option value="MB Bank">MB Bank</a-select-option>
                <a-select-option value="BIDV">BIDV</a-select-option>
                <a-select-option value="TechComBank"
                  >TechComBank</a-select-option
                >
                <a-select-option value="VietComBank"
                  >VietComBank</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Created At" name="createdAt">
              <a-date-picker
                v-model:value="form.createdAt"
                style="width: 100%"
                :format="['DD/MM/YYYY']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="Description" name="description">
              <a-textarea
                v-model:value="form.description"
                :rows="4"
                placeholder="please enter  description"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>

      <template #extra>
        <a-space>
          <a-button @click="onClose">Cancel</a-button>
          <a-button type="primary" class="text-black" @click="confirm"
            >Confirm</a-button
          >
        </a-space>
      </template>
    </a-drawer>
  </div>
</template>

<script>
// import dayjs from 'dayjs';
import moment from "moment";
import { defineComponent, computed, onMounted, ref } from "vue";

export default defineComponent({
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    dataEdit: {
      required: true,
      type: Object,
    },
  },
  setup(props, ctx) {
    // ============SETUP BUTTON CREATE=============
    let form = ref({
      accNumber: "",
      money: "",
      bankName: "",
      createdAt: null,
      description: "",
    });
    let visibleDrawer = computed(() => props.visible);

    let dataForm = { ...props.dataEdit };


    onMounted(() => {
      if (dataForm) {
        form.value.accNumber = dataForm.accNumber;
        form.value.money = dataForm.money;
        form.value.bankName = dataForm.bankName;
        form.value.createdAt = moment(dataForm.createdAt);
    console.log(form.value.createdAt instanceof moment);

        form.value.description = dataForm.description;
      } else {
        console.log("error");
      }
    });

    const rules = {
      accNumber: [
        {
          required: true,
          message: "Please enter user acc number",
        },
      ],
      money: [
        {
          required: true,
          message: "please enter ",
        },
      ],
      bankName: [
        {
          required: true,
          message: "Please select an bankName",
        },
      ],
      createAt: [
        {
          required: true,
          message: "Please choose the createAt",
        },
      ],
      description: [
        {
          required: true,
          message: "Please enter description",
        },
      ],
    };

    const onClose = () => {
      visibleDrawer.value = false;
      ctx.emit("onClose");
    };

    const confirm = () => {
      ctx.emit('confirm',dataForm.id,form)  
    }

    return {
      form,
      rules,
      onClose,
      confirm,
      visibleDrawer,
    };
  },
});
</script>
