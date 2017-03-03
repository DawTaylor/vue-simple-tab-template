Vue.component('tabs', {
    template : `
        <section>

            <div class="tabs">
                <ul>
                    <li v-for="tab in tabs" :class="{ 'is-active' : tab.isActive }" >
                        <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
                    </li>
                </ul>
            </div>

            <div class="tab-panel">
                <slot></slot>
            </div>
        </section>
    `,
    
    data() {
        return {
            tabs : []
        }
    },

    mounted() {
        this.tabs = this.$children
    },

    methods : {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name)
            })

            this.changeTitle(selectedTab.name)
        },
        changeTitle(title) {
            document.title = title
        }
    }
})

Vue.component('tab', {
    template : `
        <div v-show="isActive" ><slot></slot></div>
    `,
    props : {
        name : { required : true },
        selected : { default : false }
    },
    data() {
        return {
            isActive : false
        }
    },
    created() {
        if(window.location.hash || window.location.hash !== '') {
            this.isActive = (window.location.href.toString().includes(this.href)) ? true : false
        } else {
            this.isActive = this.selected
        }
    },
    computed: {
        href() {
            return "/#" + this.name.toLowerCase().replace(/ /g, '-')
        }
    }
})

new Vue({
    el : '#root'
})