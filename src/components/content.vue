<!-- eslint-disable -->
<template>
  <div>
    <!-- Button create account -->
    <a-button type="primary" class="text-black mb-5" @click="showDrawerCreate">
      <template #icon></template>
      New account
    </a-button>
    <!-- =======TABLE============ -->
    <a-table bordered :data-source="dataSource" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template class="flex flex-row" v-if="column.dataIndex == 'operation'">
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="onDelete(record.id)"
          >
            <a-button type="primary" class="text-black">Delete </a-button>
          </a-popconfirm>

          <a-popconfirm
            class="ml-3"
            v-if="dataSource.length"
            title="Sure to edit?"
            @confirm="onEdit(record.id)"
          >
            <a-button type="primary" class="text-black">Edit</a-button>
          </a-popconfirm>
        </template>
        <!-- ======================== -->
      </template>
    </a-table>

    <EditAcc
      v-if="visibleEdit"
      :visible="visibleEdit"
      :dataEdit="dataEdit"
      @onClose="closeDrawer"
      @confirm="updateAcc"
    />

    <CreateAcc
      v-if="visibleCreate"
      :visible="visibleCreate"
      @onCloseCreate="closeDrawerCreate"
      @createAcc="createAccount"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import EditAcc from "@/components/handleAcc/editAcc.vue";
import CreateAcc from "./handleAcc/createAcc.vue";

export default defineComponent({
  components: {
    EditAcc,
    CreateAcc,
  },
  emits: ["onClose","confirm","onCloseCreate","createAcc"],
  setup() {
    //  ===========SETUP FORM=============
    const columns = [
      {
        title: "Bank Name",
        dataIndex: "bankName",
        // width: '15%',
      },
      {
        title: "Account Number",
        dataIndex: "accNumber",
      },
      {
        title: "Money",
        dataIndex: "money",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
      },
      {
        title: "Description",
        dataIndex: "description",
      },
      {
        title: "operation",
        dataIndex: "operation",
      },
    ];

    let dataSource = ref([]);
    let dataEdit = ref({});
    let loading = ref(false);

    const store = useStore();
    const visibleEdit = ref(false);

    const visibleCreate = ref(false);

    // function get accounts
    const getAccounts = async () => {
      try {
        await store.dispatch("getAllAcc");
        dataSource.value = await store.state.accounts;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getAccounts();
    });

    // function deleteAcc
    const onDelete = async (id) => {
      try {
        await store.dispatch("deleteAcc", id);
        getAccounts();
      } catch (error) {
        console.log(error);
      }
    };

    // function edit account

    const closeDrawer = () => {
      visibleEdit.value = false;
    };

    const onEdit = async (id) => {
      try {
        loading.value = true;
        await store.dispatch("getAcc", id);
        dataEdit.value = store.state.account;
        visibleEdit.value = true;
      } finally {
        loading.value = false;
      }
    };

    const updateAcc = async (id, form) => {
      try {
        await store.dispatch("updateAcc", { id, form });
        closeDrawer();
        getAccounts();
      } catch (error) {
        console.log(error);
      }
    };

    // function create account
    const showDrawerCreate = () => {
      visibleCreate.value = true;
      // console.log(visibleCreate.value);
    };

    const closeDrawerCreate = () => {
      visibleCreate.value = false;
    };

    const createAccount = async (form) => {
      try {
        await store.dispatch("createAcc", form);
        alert("Create a new account successfully!");
        await closeDrawerCreate();
        await getAccounts();
      } catch (error) {
        console.log(error);
      }
    };

    // ==RETURN===
    return {
      store,

      // Return form
      columns,
      onDelete,
      dataSource,
      dataEdit,
      onEdit,
      visibleEdit,
      //vuex
      getAccounts,
      closeDrawer,
      updateAcc,

      visibleCreate,
      showDrawerCreate,
      closeDrawerCreate,
      createAccount,
    };
  },
});
</script>

<style>
.editable-cell {
  position: relative;
}
.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  margin-top: 4px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.ant-btn > span {
  color: black;
}
</style>
