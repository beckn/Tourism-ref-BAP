<template>
    <transition name="dropdown-content-copy-order">
        <div v-if="active" class="drop">
            <div @click="copyOrder" class="rahul">
                Copy Order
            </div>
            <div>
                <hr class="sf-divider" />
            </div>
            <!-- <div class="rahul">
                Scan QR
            </div> -->
            <!-- <div>
                <hr class="sf-divider" />
            </div> -->

        </div>
    </transition>
</template>
  
<script>
export default {
    name: 'CopyOrderDropdownContent',
    inject: ['sharedState'],

    methods: {
        async copyOrder() {
            const orderObject = localStorage.getItem('orderHistory')[0].order
            try {
                await navigator.clipboard.writeText(localStorage.getItem('orderHistory'));
            } catch (error) {
                console.log('error', error)
                alert('Cannot copy');
            }
        }
    },

    setup(props, { root }) {
        const isUserAuthenticated = () => {
            if (root.$store.$fire.auth.currentUser === null) {
                return false;
            }
            return true;
        };

        return {
            isUserAuthenticated,
        };
    },

    computed: {
        active() {
            return this.sharedState.active;
        },
    },
};
</script>
  
<style>
.drop {
    display: block;
    position: absolute;
    right: -6px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    width: 8rem;
    border-radius: 10px;
    margin-top: 2.1rem;
    margin-right: -0.4rem;
    background: #fbfcff;
}

.rahul {
    padding: 10px;
}

.rahul:hover {
    background: #387F9A;
    border-radius: 5px;
    color: #ffff;
}
</style>
  