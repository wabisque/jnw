<script setup>
import IconComponent from '@/components/icon.vue';
import { computed, ref } from 'vue';

defineOptions({
  name: 'text-field-component',
});

const props = defineProps({
  disabled: Boolean,
  icon: String,
  modelValue: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
});

defineEmits([
  'update:model-value',
]);

const isVisible = ref(false);

const fieldType = computed(() => {
  switch(props.type) {
    case 'password': return isVisible.value ? 'text' : 'password';
    default: return 'text';
  }
});
</script>

<template>
  <div
    class="text-field-component"
    :class="{
      'text-field-component--disabled': disabled,
    }"
  >
    <div class="text-field-component__label">
      <slot name="label"></slot>
    </div>

    <input
      class="text-field-component__field"
      :class="{
        'text-field-component__field--icon': !!icon,
        'text-field-component__field--toggle': type == 'password',
      }"
      :disabled="disabled"
      :placeholder="placeholder"
      :type="fieldType"
      :value="modelValue"
      @input="$emit('update:model-value', $event.target.value);"
    >

    <icon-component
      class="text-field-component__icon"
      :type="icon"
      v-if="!!icon"
    ></icon-component>

    <icon-component
      class="text-field-component__toggle"
      :type="isVisible ? 'eye' : 'eye-crossed'"
      @click="isVisible = !isVisible;"
      v-if="type == 'password'"
    ></icon-component>
  </div>
</template>

<style>
.text-field-component {
  display: inline-grid;
  grid-template-columns: [ field-start icon-start label-start ] auto [ icon-end ] 1fr [ toggle-start ] auto [ field-end label-end toggle-end ];
  grid-template-rows: [ label-start ] auto [ label-end field-start icon-start toggle-start ] 1fr [ field-end icon-end toggle-end ];
}

.text-field-component--disabled {
  opacity: 65%;
}

.text-field-component__label {
  font-size: 0.875rem;
  font-weight: 500;
  grid-area: label;
  margin-block-end: 0.25rem;
}

.text-field-component__label:empty {
  display: none;
}

.text-field-component__field {
  border: 0.08rem solid #E5E8F0;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  grid-area: field;
  padding: 0.75rem;
}

.text-field-component__field::placeholder {
  color: #ababab;
  font-size: 1rem;
  font-weight: 300;
}

.text-field-component__field--icon {
  padding-inline-start: 3rem;
}

.text-field-component__icon {
  align-self: center;
  grid-area: icon;
  margin-inline-start: 0.75rem;
}

.text-field-component__toggle {
  align-self: center;
  cursor: pointer;
  grid-area: toggle;
  margin-inline-end: 0.75rem;
}
</style>
