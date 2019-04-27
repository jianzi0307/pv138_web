<template>
  <div>
    <div>
      <Select v-model="model2" size="small" style="width:100px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Select v-model="model2" size="small" style="width:100px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Select v-model="model2" size="small" style="width:100px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Input suffix="ios-search" placeholder="Enter text" style="width: auto"/>
    </div>
    <div></div>
  </div>
</template>
