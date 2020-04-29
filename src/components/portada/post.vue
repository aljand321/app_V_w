<template>
    <div class="mt-5">
        <b-row>
            <b-col cols="12" md="6" lg="6">
                <b-form>
                    <b-form-group
                        id="input-group-1"
                        label="Email address:"
                        label-for="input-1"
                        
                    >
                        <b-form-input
                        id="input-1"
                        
                        type="text"
                        required
                        placeholder="Enter email"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                        <b-form-input
                        id="input-2"
                        
                        required
                        placeholder="Enter name"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group id="textarea" label="Your Name:" label-for="textarea">
                       <b-form-textarea
                        id="textarea"
                       
                        placeholder="Enter something..."
                        rows="3"
                        max-rows="6"
                        ></b-form-textarea>
                    </b-form-group>
                    <b-button type="submit" variant="primary">Submit</b-button>
                    
                    <b-button type="reset" variant="danger">Reset</b-button>                    
                </b-form>
            </b-col>
            <b-col cols="12" md="6" lg="6">
               <b-container fluid class="p-1 bg-dark">
                    <b-row>
                        <b-col>
                            <div v-b-hover="hover_m">
                                <div v-if="isHovered" class="py-3 px-4">
                                    <b-img  thumbnail fluid src="https://thekpoprage.files.wordpress.com/2015/07/t-ara-so-crazy.jpg" alt="Image 1"></b-img>                    
                                </div>
                                 <div v-else class="py-4 px-5">
                                    <b-img  thumbnail fluid src="https://thekpoprage.files.wordpress.com/2015/07/t-ara-so-crazy.jpg" alt="Image 1"></b-img>                    
                                </div>
                            </div>                            
                        </b-col>
                    </b-row>
                </b-container>                    
            </b-col>
        </b-row>
    </div>
</template>
<script>
    export default {
        data:() => ({
            isHovered: false
        }),
        methods:{
            hover_m(data){
                //console.log(data)
                this.isHovered = data
            }
        }
    }
</script>