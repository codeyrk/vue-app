<template>
  <v-container>
    <v-progress-linear
      height="10px"
      top
      absolute
      :active="loading"
      v-model="valueDeterminate"
      color="secondary"
    ></v-progress-linear>
    <v-row>
      <h1>Upload PCAPs</h1>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="10">
        <v-file-input
          v-model="files"
          small-chips
          show-size
          counter
          multiple
          accept=".pcap"
          label="Upload PCAP files"
        ></v-file-input>
      </v-col>
      <v-col cols="2">
        <v-btn type="submit" color="secondary" @click="onSubmit" class="mt-4">Upload</v-btn>
      </v-col>
    </v-row>
    <!-- <v-row absolute justify="left">
      <v-col cols="8">
        <v-spacer></v-spacer>
        <v-progress-linear absolute :active="loading" v-model="valueDeterminate" color="secondary"></v-progress-linear>
        <v-spacer></v-spacer>
      </v-col>
    </v-row>-->

    <v-row class="pa-md-12 mx-lg-auto">
      <h2>Uploaded Files</h2>
      <v-col cols="12" md="12">
        <EventTimeline :timeline="timeline" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import EventTimeline from "@/components/EventTimeline.vue";

import timelineData from "../data/timeline.json";

export default {
  name: "UploadPage",
  components: {
    EventTimeline
  },
  data: () => ({
    files: [],
    timeline: timelineData,
    temp: [],
    valueDeterminate: 0,
    loading: false
  }),
  methods: {
    onSubmit() {
      this.loading = true;
      // eslint-disable-next-line no-console
      console.log(this.files);

      let formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];

        formData.append("files[" + i + "]", file);
      }

      axios
        .post("http://192.168.1.106:8080/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: progressEvent => {
            if (progressEvent.lengthComputable) {
              this.valueDeterminate = Math.round(
                100 * (progressEvent.loaded / progressEvent.total)
              );
            }
          }
        })
        .then(
          function(response) {
            // eslint-disable-next-line no-console
            console.log(response.data);

            var i;
            for (i = 0; i < this.files.length; i++) {
              let item = {
                color: "secondary",
                icon: "mdi-lan",
                title: this.files[i].name,
                text: response.data[i].FileName
              };
              this.temp.push(item);
              this.timeline = this.temp.reverse();
            }
            this.files = [];
            this.loading = false;
          }.bind(this)
        );
    }
  }
};
</script>
