<template>
  <v-container fill-height>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-img
          :src="require('../assets/wireshark-icon.png')"
          class="my-3"
          contain
          height="200"
        ></v-img>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to PCAP Decoder
        </h1>
        <p class="subheading font-weight-regular">
          In the field of computer network administration, pcap is an
          <br />application programming interface (API) for capturing network
          traffic.
        </p>
      </v-flex>

      <v-flex mb-5 xs12>
        <h2 class="headline font-weight-bold mb-3">Wiki</h2>

        <v-layout justify-center>
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    whatsNext: [
      {
        text: "Wikipedia",
        href: "https://en.wikipedia.org/wiki/Pcap"
      },
      {
        text: "Wireshark Wiki",
        href: "https://wiki.wireshark.org/"
      },
      {
        text: "WinPCAP Library",
        href: "https://www.winpcap.org/default.htm"
      }
    ]
  })
};
</script>
