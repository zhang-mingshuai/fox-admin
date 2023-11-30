<template>
  <div class="container">
    <Breadcrumb :items="['系统管理', '菜单管理']" />
    <a-card>
      <a-button type="primary" @click="handleClick">新建</a-button>
      <a-modal
        v-model:visible="visible"
        title="新建菜单"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-form :model="form">
          <a-form-item field="locale" label="菜单名称">
            <a-input
              v-model="form.locale"
              placeholder="请输入菜单名称"
            ></a-input>
          </a-form-item>
          <a-form-item field="parentNo" label="父级菜单">
            <a-select
              v-model="form.parentNo"
              :options="parentMenuOptions"
              :loading="loading"
              :field-names="parentMenuFieldNames"
              placeholder="请选择父级菜单"
              allow-search
              @search="handleParentMenuSearch"
              @popup-visible-change="handlePopup"
            ></a-select>
          </a-form-item>
          <a-form-item field="path" label="路由地址">
            <a-input v-model="form.path" placeholder="请输入路由地址"></a-input>
          </a-form-item>
          <a-form-item field="name" label="组件名称">
            <a-input v-model="form.name" placeholder="请输入组件名称"></a-input>
          </a-form-item>
          <a-form-item field="order" label="排序">
            <a-input-number v-model="form.order" :min="0" />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { getMenuOptions, MenuOptionsRes } from '@/api/menu';

  const visible = ref(false);
  const loading = ref(false);
  const form = reactive({
    path: '',
    parentNo: '',
    locale: '',
    name: '',
    order: 0,
  });
  const handleClick = () => {
    visible.value = true;
  };
  const handleOk = () => {
    console.log(form);
    visible.value = false;
  };
  const handleCancel = () => {
    visible.value = false;
  };
  // 父级菜单
  const parentMenuFieldNames = { value: 'menuNo', label: 'menuName' };
  const parentMenuOptions = ref<MenuOptionsRes[]>([]);

  const handlePopup = async (value: boolean) => {
    if (!value) {
      return;
    }
    await handleParentMenuSearch('');
  };

  const handleParentMenuSearch = async (value: string) => {
    try {
      loading.value = true;
      const { data } = await getMenuOptions({ name: value });
      parentMenuOptions.value = data;
    } finally {
      loading.value = false;
    }
  };
</script>

<script lang="ts">
  export default {
    name: 'Menu2',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
