<template>
  <div class="add-listing-image">
    <v-card class="transparent text-center mb-4" elevation="0">
      <v-img
        v-if="uploadedImage"
        aspect-ratio="1.42"
        :src="uploadedImage"
        class="rounded-lg"
      >
        <div class="d-flex align-start justify-end pa-4">
          <v-btn small fab color="primary" class="mx-2">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn small fab color="error" @click="deleteImage" class="mx-2"
            ><v-icon>mdi-delete-forever</v-icon></v-btn
          >
        </div>
      </v-img>
      <v-card-text v-else style="border: 5px dashed grey;" @click="uploadImage">
        <v-icon size="120">mdi-plus</v-icon>

        <p v-if="index == 1" class="display-1">Add main image</p>
        <p v-else class="display-1">Add extra image</p>
      </v-card-text>
    </v-card>
    <v-dialog v-model="imageCropModal" persistent>
      <v-card>
        <v-card-title class="headline" style="position: relative"
          ><span>Select / Crop Image</span><v-spacer> </v-spacer
          ><v-btn color="error" icon @click="imageCropModal = false"
            ><v-icon>mdi-close</v-icon></v-btn
          ><v-progress-linear
            :active="uploadingImage"
            :indeterminate="uploadingImage"
            absolute
            bottom
            color="primary"
          ></v-progress-linear
        ></v-card-title>
        <v-expand-transition>
          <v-card-text v-show="imageSelected" class="pa-0"
            ><v-alert
              type="info"
              class="mb-0"
              prominent
              icon="mdi-camera-iris"
              text
              >Pinch to zoom, drag to move, use buttons to
              rotate/delete</v-alert
            ></v-card-text
          >
        </v-expand-transition>
        <v-expand-transition>
          <v-card-text v-show="!imageSelected" class="pa-0"
            ><v-alert
              type="info"
              class="mb-0"
              prominent
              icon="mdi-phone-rotate-landscape"
              text
              >For best results, please take pictures in landscape mode</v-alert
            ></v-card-text
          >
        </v-expand-transition>

        <v-card-text
          class="px-0  d-flex justify-center align-center"
          style="line-height:0rem;"
        >
          <croppa
            :width="355"
            :height="250"
            placeholder="Click/Tap to Select Image"
            placeholder-color="#000"
            :placeholder-font-size="24"
            :prevent-white-space="true"
            :show-remove-button="false"
            :show-loading="true"
            :loading-size="50"
            loading-color="#606060"
            canvas-color="transparent"
            :quality="2"
            v-model="croppa"
          ></croppa>
        </v-card-text>
        <v-expand-transition>
          <v-card-text v-show="imageSelected" class="py-0"
            ><v-text-field
              v-model="userGivenName"
              outlined
              label="Image file name"
              placeholder="Every image needs a name no?"
            >
            </v-text-field
          ></v-card-text>
        </v-expand-transition>
        <v-card-actions>
          <v-btn
            @click="croppa.rotate(-1)"
            large
            :disabled="!imageSelected"
            icon
            color="accent"
            :class="{
              'mx-4': $vuetify.breakpoint.mdAndUp,
              'mx-2': !$vuetify.breakpoint.mdAndUp,
            }"
          >
            <v-icon>mdi-rotate-left</v-icon>
          </v-btn>
          <v-btn
            @click="croppa.rotate()"
            large
            :disabled="!imageSelected"
            icon
            color="accent"
            :class="{
              'mx-4': $vuetify.breakpoint.mdAndUp,
              'mx-2': !$vuetify.breakpoint.mdAndUp,
            }"
          >
            <v-icon>mdi-rotate-right</v-icon>
          </v-btn>
          <v-btn
            @click="croppa.remove()"
            large
            :disabled="!imageSelected"
            icon
            color="accent"
            :class="{
              'mx-4': $vuetify.breakpoint.mdAndUp,
              'mx-2': !$vuetify.breakpoint.mdAndUp,
            }"
          >
            <v-icon>mdi-delete-forever</v-icon>
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn
            color="primary darken-1"
            class="px-4"
            :loading="uploadingImage"
            :disabled="!imageSelected"
            large
            @click="saveImage()"
            ><v-icon>mdi-content-save</v-icon> Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: ['index'],
  data() {
    return {
      uploadedImage: null,
      uploadingImage: false,
      userGivenName: '',
      imageCropModal: false,
      listingImage: null,
      croppa: {},
    };
  },
  computed: {
    imageSelected() {
      if (this.croppa.hasImage) {
        return this.croppa.hasImage() ? true : false;
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapActions(['uploadListingImage']),
    deleteImage() {
      // this.imageCropModal = true;
      this.croppa.remove();
      this.uploadedImage = null;
      this.$emit('deletedImage');
    },
    uploadImage() {
      this.imageCropModal = true;
      this.croppa.chooseFile();
    },
    saveImage() {
      this.uploadingImage = true;
      console.log(this.croppa.hasImage());
      console.log(this.croppa);
      console.log(this.croppa);
      console.log(this.croppa.generateDataUrl());
      console.log(this.croppa.getChosenFile());
      // const listingImage = this.croppa.getChosenFile();
      // const listingImage = this.croppa.generateDataUrl('image/jpeg', 0.8);

      this.uploadedImage = this.croppa.generateDataUrl('image/jpeg', 0.8);
      // this.imageCropModal = false;

      this.croppa.generateBlob(
        (blob) => {
          var url = URL.createObjectURL(blob);
          console.log(url, blob);
          // var a = document.createElement('a');
          // a.download = 'filename';
          // a.href = url;
          // a.click();
          // URL.revokeObjectURL(url)
          this.listingImage = blob;
          this.uploadListingImage({
            listingImage: this.listingImage,
            index: this.index,
          }).then(() => {
            this.$emit('savedImage', {
              index: this.index,
              listingImage: this.listingImage,
            });
            this.uploadingImage = false;
          });
        },
        'image/jpeg',
        0.8
      );

      /**
       * These are input related events that you can listen to:
        initial-image-loaded: (v0.3.2+) emitted when initial image loaded. It can be useful when you provide initial image with the initial-image prop.
        file-choose: emitted whenever a new file was chosen, no matter it is valid or not.
        file-size-exceed, file-type-mismatch: emitted when the chosen file is not valid. See more here
        new-image: (v0.2.0+) emitted when a new valid image is received and read successfully.
        new-image-drawn: (v1.0.0+) emitted when a new valid image is received and read successfully.
        image-remove: emitted whenever the current image is removed from croppa.
        loading-start: (v1.1.0+) emitted when image loading phase starts.
        loading-end: (v1.1.0+) emitted when image loading phase ends.
       */
    },
  },
};
</script>

<style></style>
