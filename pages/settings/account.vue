<template>
  <div>
    <form class='max-w-xl ml-12' @submit.prevent='updateAccount()'>
      <div class='flex items-center'>
        <div class='h-20 overflow-hidden relative w-20 cursor-pointer rounded-full'>
          <input id='avatar' class='absolute h-full opacity-0 w-full z-20 cursor-pointer' type='file' accept='image/*' @change='buildCropper($event)' />
          <div class='absolute duration-300 flex h-full opacity-0 text-2xl text-white transition w-full z-10' style='background: #0000003b'>
            <fa class='m-auto' icon='cloud-upload-alt'></fa>
          </div>
          <img class='w-full h-full object-cover relative z-0' :src='$CDN(form.avatar)'  alt='' />
        </div>
        <label class='uppercase text-xs text-indigo-500 ml-4' for='avatar'>Ảnh Đại Diện</label>
      </div>
      <div class='flex flex-col mt-5'>
        <label class='uppercase text-xs text-indigo-500' for='name'>Tên</label>
        <input id='name' v-model='form.name' required class='bg-indigo-50 border-b-2 border-transparent duration-500 ease-in-out focus:border-indigo-500 focus:outline-none font-thin mt-2 px-5 py-3 text-gray-600 text-sm transition' type='text' placeholder='foodmix' />
      </div>
      <div class='flex flex-col mt-5'>
        <label class='uppercase text-xs text-indigo-500' for='email'>Địa Chỉ Email</label>
        <input id='email' v-model='form.email' required class='bg-indigo-50 border-b-2 border-transparent duration-500 ease-in-out focus:border-indigo-500 focus:outline-none font-thin mt-2 px-5 py-3 text-gray-600 text-sm transition' type='email' placeholder='user@foodmix.com' />
      </div>
      <div class='flex flex-col mt-5'>
        <label class='uppercase text-xs text-indigo-500' for='province'>Chỗ Ở</label>
        <select id='province' v-model='form.province' required class='bg-indigo-50 border-b-2 border-transparent duration-500 ease-in-out focus:border-indigo-500 focus:outline-none font-thin mt-2 px-5 py-3 text-gray-600 text-sm transition'>
          <option v-for='(province, index) in provinces' :key='index' :value='province'>
            {{ province }}
          </option>
        </select>
      </div>
      <div class='flex flex-col mt-5'>
        <label class='uppercase text-xs text-indigo-500'>Giới Thiệu</label>
        <textarea id='about' v-model='form.about' placeholder='Giới thiệu đôi chút về bản thân' class='bg-indigo-50 h-36 border-b-2 border-transparent duration-500 ease-in-out focus:border-indigo-500 focus:outline-none font-thin mt-2 px-5 py-3 text-gray-600 text-sm transition' />
      </div>
      <button
        class='bt mt-5 text-sm bg-indigo-500 text-white p-2 w-32 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300'
        type='submit'
        :class='{
          _loading: isLoading
        }'
      >
        Lưu Thay Đổi
      </button>
    </form>

    <lazy-base-modal ref='cropModal' event='cropModal' title='Cắt Ảnh Của Bạn'>
      <div>
        <client-only>
          <vue-cropper
            ref="cropBanner"
            class="j_avatar_img cropper-area"
            alt="Source Image"
            :auto-crop-area="1"
            :crop-box-resizable="false"
            :toggle-drag-mode-on-dblclick="false"
            :drag-mode="'move'"
            :aspect-ratio="1"
            :view-mode="3"
            :crop-box-movable="false"
            :container-style='{
              width: 280,
              height: 280
            }'
          ></vue-cropper>
        </client-only>
        <div class='flex justify-evenly mt-7 mx-auto' style='max-width: 280px;'>
          <button
            class='border flex h-7 items-center justify-center rounded text-xs w-7'
            @click='$refs.cropBanner.rotate(-10);'

          >
            <fa icon='undo'></fa>
          </button>
          <button
            class='border flex h-7 items-center justify-center rounded text-xs w-7'
            @click='$refs.cropBanner.relativeZoom(-0.2)'
          >
            <fa icon='minus'></fa>
          </button>
          <button
            class='border flex h-7 items-center justify-center rounded text-xs w-7'
            @click='$refs.cropBanner.relativeZoom(0.2)'
          >
            <fa icon='plus'></fa>
          </button>
          <button
            class='border flex h-7 items-center justify-center rounded text-xs transform w-7' style='transform: scaleX(-1);'
            @click='$refs.cropBanner.rotate(10);'
          >
            <fa icon='undo'></fa>
          </button>
        </div>
        <div class='flex justify-evenly mt-7'>
          <button
            class='border-2 border-indigo-600 bt focus:outline-none hover:shadow-none p-2 rounded-full shadow-lg text-gray-600 text-indigo-600 text-sm text-white w-1/3'
            @click='$nuxt.$emit("cropModal")'
          >
            Huỷ
          </button>

          <button
            class='bg-indigo-500 bt border-2 border-indigo-500 focus:outline-none hover:shadow-none p-2 rounded-full shadow-lg text-sm text-white w-1/3'
            :class='{
              _loading: isUploading
            }'
            @click='cropBanner()'
          >
            Tải Ảnh Lên
          </button>
        </div>
      </div>
    </lazy-base-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import listProvinces from '~/assets/provinces.json'

export default {
  name: 'SettingAccount',
  data() {
    return {
      form: {
        name: '',
        email: '',
        avatar: '',
        about: '',
        province: ''
      },
      isUploading: false,
      isLoading: false,
      provinces: []
    }
  },
  computed: {
    ...mapGetters('pref', ['user'])
  },
  created() {
    this.form = Object.assign({}, this.user)
    Object.values(listProvinces).forEach((e)=> {
      this.provinces.push(e.name)
    })
  },
  methods: {
    ...mapActions('pref', ['setUser']),

    buildCropper({ target }) {

      const file = target.files[0]
      if (!file.type.includes('image/')) {
        this.$nuxt.$emit('pushNotify', { msg: 'Hãy chọn ảnh', success: false })
        return
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = (event) => {
          this.$refs.cropBanner.replace(event.target.result)
          this.$nuxt.$emit('cropModal')
        }
        reader.readAsDataURL(file)
      } else {
        this.$nuxt.$emit('pushNotify', { msg: 'Sorry, FileReader API not supported', success: false })
      }

    },

    cropBanner() {
      this.$refs.cropBanner.getCroppedCanvas().toBlob((blob) => {
        this.uploadImage(blob, 'user')
      })
    },

    async uploadImage(image, path) {

      this.isUploading = true
      try {
        const formData = new FormData()
        formData.append('image', image)
        formData.append('path', path)
        const { data } = await this.$axios.$post('/upload/single', formData)
        this.form.avatar = data
        this.$refs.cropModal.dispose()
      } catch (e) {}
      this.isUploading = false

    },

    async updateAccount() {
      this.isLoading = true
      try {
        await this.$axios.$put('/users', this.form)
        this.setUser(this.form)
      } catch (e) {}
      this.isLoading = false
    }

  }
}
</script>
<style>

.cropper-crop-box {
  border-radius: 50%;
  overflow: hidden;
}

.cropper-area {
  margin: 0 auto;
  width: 280px;
  height: 280px;
  overflow: hidden;
  position: relative;
  border-radius: 100%;
}
#province::-ms-expand {
  display: none;
}
</style>
