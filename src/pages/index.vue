<script setup lang="ts">
const { t } = useI18n()
const counter = useCounterStore()
counter.increment()
</script>

<template>
  <HelloWorld :count="counter.counter" :msg="t('hello')" />
  <TheWelcome />
</template>

<route lang="yaml">
meta:
  layout: default
</route>
