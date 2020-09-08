<template>
<!-- https://firebase.google.com/docs/auth/web/manage-users -->
<!-- https://desarrolloweb.com/articulos/introduccion-firebase-storage.html -->


    <v-container>

        <v-layout row  wrap justify-space-around align-center mx-1>
                <v-flex lg5  mx-10>
                    <v-card>
                <v-toolbar color="infoPublicidad">
                    <v-toolbar-title>
                        Dirección Administrativa y Financiera
                    </v-toolbar-title>
                </v-toolbar>
                <!-- <v-card-text>
                    <v-text-field autofocus v-model="email" label="email"></v-text-field>
                    <v-text-field @keyup.enter="ingresar" v-model="password" label="Password" type="password"></v-text-field>
                </v-card-text> -->
                <v-card-text>
                    <v-layout >
                       <div class="row">
                           <div class="col-md-12">
                               <p style="text-align: justify;">
                                  El desarrollo de la misión institucional enmarcado en la filosofía de proyecto de
vida y la formación académica, requiere del soporte y acompañamiento de los procesos administrativos.
                               </p>

                               <p style="text-align: justify;">
                                   En este espacio estamos dispuestos a atender sus inquietudes, sugerencias y comentarios.  Contáctenos.


                                   
                               </p>
                             
                           </div>
                              
                           
                           
                       
                       </div>
                    </v-layout>
                   
                </v-card-text>
            </v-card>
                </v-flex>

                
        <!-- La column -->
        <v-flex xs12 sm8 md6 lg5 xl4>
            <!-- la estructura  -->
            <v-card>
                <v-toolbar color="primary" dark>
                    <v-toolbar-title>
                        Conéctate con uno de nuestros asesores
                    </v-toolbar-title>
                </v-toolbar>
                <!-- <v-card-text>
                    <v-text-field autofocus v-model="email" label="email"></v-text-field>
                    <v-text-field @keyup.enter="ingresar" v-model="password" label="Password" type="password"></v-text-field>
                </v-card-text> -->
                <v-card-text>
                    <v-layout>
                         <div>
                        <v-alert border="top" colored-border type="info" elevation="2">
                            <b> Horario de atención:</b> <br> 
                            Lunes a viernes de 8:00 a.m a 12:00 m. y 2:00 p.m. a 6:00 p.m <br>
                            Sábados: 8:00 a.m. a 12:00 m. <br> Zona horaria: UTC-5
                        </v-alert>
                    </div>
                    </v-layout>
                    <v-layout justify-end>
                        <v-btn @click="ingresar" class="mx-2" style="text-transform: none;" color="infoPublicidad">
                             <v-icon class="mx-2" style="color: #fbbc05;">fab fa-google</v-icon>
                            Inicia sesión con Google</v-btn>
                    </v-layout>
                    <v-layout justify-end mt-3>
                        <v-btn class="mx-2" outline flat style="text-transform: none;" @click="ingresarF" color="infoPublicidad">
                            <v-icon class="mx-2" style="color: #385898;">fab fa-facebook</v-icon>
                            Inicia sesión con Facebook</v-btn>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

             
        </v-layout>
        <!-- end fila -->
        
        

    </v-container>
    
</template>


<script>

import {auth,provider,providerF,db,storage} from '@/firebase'
// import {auth, db} from '@/firebase'

export default {
    props: {
       
    },
    watch: {
       
    },
    data () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
       async ingresar () {

           
          
        try {
            
            await auth.signInWithPopup(provider)
            if(auth.currentUser){

                console.log('Usuario registrado');
                let uidCurrentUser = auth.currentUser.uid
                let nameCurrentUser = auth.currentUser.displayName
                let emailCurrentUser = auth.currentUser.email
                let photoCurrentUser = auth.currentUser.photoURL
                let lastSignInTime = auth.currentUser.metadata.lastSignInTime
                console.log('UID: ' + uidCurrentUser);
                console.log('Name: ' + nameCurrentUser);
                console.log('email: ' + emailCurrentUser);
                console.log('photo: ' + photoCurrentUser);
                console.log('lastSignInTime: ' + lastSignInTime);

                let usuario = {
                    foto: photoCurrentUser,
                    uid: uidCurrentUser,
                    nombre: nameCurrentUser,
                    lastSignInTime: lastSignInTime,
                    rol: 'user'
                }


                await db.collection('usuariosamd')
                        .doc(uidCurrentUser)
                        .set(usuario)
                        .then(function() {
                            console.log("Document successfully written!");   
                        }).catch(function () {
                            console.log("Document not success");
                        });

                  //  acces for document on BD
                let doc = await db.collection('usuariosamd')
                                .doc(uidCurrentUser)
                                .get()
                                console.log(doc);
                if(doc.exists){
                    console.log('Exits');
                    let usuario = doc.data()
                    this.$emit('onIngresar', usuario)
                }else{
                    this.enviarNotificacion('No se encontró la información del usuario', 'Error')
                }

                storage.ref('usuariosamd/'+uidCurrentUser+'/photo.jpg')
                let task = storage.put(photoCurrentUser)
                console.log("task: "+task);
            }
               
        } catch (error) {
            console.log("Ocurrio un error en login"+error)
        }           
            },
                // Inicia sesion con facebook
       async ingresarF () {
        try {
            await auth.signInWithPopup(providerF)


            console.log("Facebook")
            if(auth.currentUser){

                console.log('Start record data user');
                let uidCurrentUser = auth.currentUser.uid
                let nameCurrentUser = auth.currentUser.displayName
                let emailCurrentUser = auth.currentUser.email
                let photoCurrentUser = auth.currentUser.photoURL
                let lastSignInTime = auth.currentUser.metadata.lastSignInTime
                console.log('UID: ' + uidCurrentUser);
                console.log('Name: ' + nameCurrentUser);
                console.log('email: ' + emailCurrentUser);
                console.log('photo: ' + photoCurrentUser);
                console.log('lastSignInTime: ' + lastSignInTime);

                let usuario = {
                    foto: photoCurrentUser,
                    uid: uidCurrentUser,
                    nombre: nameCurrentUser,
                    lastSignInTime: lastSignInTime,
                    rol: 'user'
                }


                await db.collection('usuariosvaca')
                        .doc(uidCurrentUser)
                        .set(usuario)
                        .then(function() {
                            console.log("Document successfully written!");   
                        }).catch(function () {
                            console.log("Document not success");
                        });

                  //  acces for document on BD
                let doc = await db.collection('usuariosvaca')
                                .doc(uidCurrentUser)
                                .get()
                                console.log(doc);
                if(doc.exists){
                    console.log('Exits');
                    let usuario = doc.data()
                    this.$emit('onIngresar', usuario)
                }else{
                    this.enviarNotificacion('No se encontró la información del usuario', 'Error')
                }

                storage.ref('usuariosvaca/'+uidCurrentUser+'/photo.jpg')
                let task = storage.put(photoCurrentUser)
                console.log("task: "+task);
            }
               
        } catch (error) {
            console.log("Ocurrio un error en login"+error)
        }           
            },
        
        enviarNotificacion (mensaje, color) {
            this.$emit('onNotificacion', { mensaje, color })
        },
        executeLogout () {
            auth.signOut()
                .then(function (){
                    console.log("logout succesful");
                })
                .catch(function (error){
                    console.log(error);
                })
        },
        // sesionUser () {
        //      console.log('create method');
        //     auth.onAuthStateChanged(user=>{
        //     if(user){
        //         // console.log(user);
        //         this.usuario = user
        //         console.log('CD-User signed: ',user);
        //     }
        //     })
        // }
    },

}
</script>