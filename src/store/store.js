import Vue from 'vue'
import Vuex from 'vuex'

import { AuthModule } from './modules/AuthModule';
import { GalleriesModule } from './modules/GalleriesModule';
import { SignedInModule } from './modules/SignedInModule';
import { CommentsModule } from './modules/CommentsModule';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        auth: AuthModule,
        galleries: GalleriesModule,
        signedId: SignedInModule, 
        comments: CommentsModule
    }
})