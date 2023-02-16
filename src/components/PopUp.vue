


<template>
<div class="container mx-auto">
    <div class="flex justify-center">
    

      <div
        v-show="isOpen"
        class="
          fixed
          inset-0
          flex
          items-center
          justify-center
          bg-gray-400 bg-opacity-5
        "
      >
        <div class="max-w-2xl p-6 bg-white rounded-md">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">Model Title</h3>
            <svg
             @click="closeDialog"
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-red-900 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="mt-4">
            <p class="mb-4 text-sm">
            id: {{rawData}}
             <!-- Official Name: {{details?.name?.offical || 'null'}} -->
            </p>
            <p class="mb-4 text-sm">
             <!-- Languages Name: {{details?.languages || 'sdfd'}} -->
            </p>
            <button
              @click="closeDialog"
              class="px-6 py-2 text-blue-800 border border-blue-600 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { isProxy, toRaw } from 'vue';
    export default {
      data(){
        return{
          rawData: {}
        }
      },
      props:{
        isOpen: {
          type: Boolean,
          default: false,
        },
        // details: Object,
        selectedObj: Object
        
      },
      methods: {
        closeDialog(){
          this.$emit("closeDialog");
          
        },
        convertObj(){
          if (isProxy(this.selectedObj)){ 
          this.rawData = toRaw(this.selectedObj)
          }
        }
        
      },
      computed() {
        this.convertObj();
      }


    }
  
</script>



