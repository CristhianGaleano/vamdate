<template>
    <v-layout justify-center align-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card>
                <v-toolbar color="primary" dark>
                    <v-toolbar-title>
                        Ingresa tu email y contraseña
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field autofocus v-model="email" label="email"></v-text-field>
                    <v-text-field @keyup.enter="ingresar" v-model="password" label="Password" type="password"></v-text-field>
                </v-card-text>
                <v-card-text>
                    <v-layout justify-end>
                        <v-btn @click="ingresar" color="secondary">Ingresar</v-btn>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>


<script>

import {auth, db} from '@/firebase'

export default {
    data () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
       async ingresar () {

           if(!this.email){
               this.enviarNotificacion('Debes indicar un email', 'Warning')
               return
           }

           if(!this.password){
               this.enviarNotificacion('Debes indicar un password', 'Warning')
               return
           }

        //    esperamos a que la operacion termine por eso el async
        try {
             await auth.signInWithEmailAndPassword(this.email, this.password)

             if(auth.currentUser){
                 
                // get iud del user
                 let uid = auth.currentUser.uid 
                //  acces for document on BD
                let doc = await db.collection('usuarios')
                                .doc(uid)
                                .get()
                if(doc.exists){
                    let usuario = doc.data()
                    this.$emit('onIngresar', usuario)
                }else{
                    this.enviarNotificacion('No se encontró la información del usuario', 'Error')
                }
             }
        } catch (error) {
            switch (error.code){
                case 'auth/user-not-fond':
                case 'auth/wrong-password':
                    this.enviarNotificacion('Usuario no válido. Revisa tu correo y contraseña', 'Warning')
                    break
                default: 
                    this.enviarNotificacion('Ocurrió unxxx error verificando la información', 'Error ')
            }
        }           
            },
        
        enviarNotificacion (mensaje, color) {
            this.$emit('onNotificacion', { mensaje, color })
        }
    },

}
</script>