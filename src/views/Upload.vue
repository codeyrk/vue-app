<template>
  <v-container>
    <v-row>
      <h1>Upload PCAPs</h1>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <v-file-input
          v-model="files"
          small-chips
          show-size
          counter
          multiple
          accept=".pcap"
          label="Upload PCAP files"
        ></v-file-input>
        <v-btn type="submit" color="secondary" @click="onSubmit" class="mr-4"
          >Upload</v-btn
        >
      </v-col>
    </v-row>

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

// import timelineData from "../data/timeline.json";

export default {
  name: "UploadPage",
  components: {
    EventTimeline
  },
  data: () => ({
    files: [],
    timeline: [],
    temp: []
  }),
  methods: {
    onSubmit() {
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
              this.timeline.push(item);
              //   this.timeline = [];
              //   for (i = this.temp.length - 1; i >= 0; i--) {
              //     this.timeline.push(this.temp[i]);
              //   }
            }
            this.files = [];
          }.bind(this)
        );
    }
  }
};
</script>
