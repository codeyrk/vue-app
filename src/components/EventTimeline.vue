<template>
  <v-timeline align-top :dense="true">
    <v-timeline-item
      v-for="(item, i) in timeline"
      :key="i"
      :color="item.color"
      :icon="item.icon"
      fill-dot
    >
      <v-card :color="item.color" dark>
        <v-card-title class="title pt-1 pb-1">
          <h3 class="title">Source File: "{{ item.title }}"</h3>
        </v-card-title>
        <v-card-text class="white text--primary">
          <p class="pt-1 body-1 mb-0">Stored As: "{{ item.text }}"</p>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  name: "EventTimeline",
  props: {
    timeline: {
      type: Array,
      required: true
    }
  }
};
</script>
