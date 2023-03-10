<template>
  <div id="product">
    <div @click="goBack" class="sf-chevron--left sf-chevron icon_back">
      <span class="sf-search-bar__icon">
        <SfIcon color="var(--c-primary)" size="20px" icon="chevron_left" />
      </span>
    </div>

    <div>
      <div>
        <img
          class="product-description-image"
          v-bind:src="images"
          alt="product img"
        />
      </div>
      <div class="head-container">
        <h1 class="head-title">{{ productGetters.getName(product) }}</h1>
      </div>

      <div class="trek-description-container">
        <p>
          Route Description: Rauli Kholi (2N) Duration: 2 Nights & 3 Days
          Highlights: Stay and Meals Sleeping Bags and Camps Experienced
          Trekking Guides Itinerary Day 01: Arrival in Manali | Manali to Gulaba
          | Trek to Rolla Kholi (8 KM Trek) Arrive in Manali and get transferred
          to Gulaba by a shared cab. Trek from Gulaba to Rola Kholi 8 kms trek
          (5 hrs) Snacks + Dinner + Camping at Rola Kholi (12500 feet) Day 02:
          Trek to Bhrigu Lake (8 KM Trek) Wake up to a beautiful morning and
          enjoy a hearty breakfast at Rola Kholi. After breakfast, enjoy a day
          trek to Bhrigu Lake (14000 feet) 4 km (2 HRs). Packed lunch will be
          served on the trek. On reaching Bhrigu Lake, enjoy the scenery and
          click some photographs. Later trek down to the base campsite at Rola
          Kholi 4km (2 hrs) Snacks + Bonfire + Dinner + Camping @ Rola Kholi
          (12500 ft) Day 03: Trek from Rolla Kholi to Gulaba | Trasnfer from
          Gulaba to Manali via Kothi (8 KM Trek) Enjoy a sumptuous breakfast at
          Rola Kholi. Later trek downhill to Gulaba 8 km (3 hrs) On reaching
          Gulaba, get transferred to Manali (25 km) Trip Ends. Price Per Person
          Rs.3,750/- *plus 5% GST Other Information INCLUSIONS All Veg Meals on
          Day 2 and 3 and Breakfast on Day 4 Shared Accommodation in Manali on
          Day 1 Clock Room to leave any extra stuff at Manali Shared Cabs from
          Manali >> Gulaba >> Manali Camping at Rolla Kholi Gear (Sticks +
          SnowGaiters + Tent + Sleeping Bag + Matts + Lights) Certified Guide +
          Support Staff + Safety Equipment EXCLUSIONS Travel from Delhi >>
          Manali >> Delhi Meals on day 1 and Local Site-seeing Non-veg and Wines
          Porter if needed & hired Any Extra meals or Snacks or juice or water
          that you purchase Anything which is not part of inclusion Cost
          Escalation due to “Force Majeure” and evacuation charges Bookings
        </p>
      </div>

      <div class="product__info">
        <div class="product__header">
          <SfHeading
            :title="productGetters.getName(product)"
            :level="3"
            class="sf-heading--no-underline sf-heading--left"
          />
        </div>

        <div class="bottom-bar-cart">
          <BookNow
            :totalPrice="cart.totalPrice"
            :totalItem="cartGetters.getTotalItems(cart)"
            :key="keyVal + 'product-page'"
            :value="cartGetters.getItemQty(isInCart({ product }))"
            @updateItemCount="updateCart"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfAccordion,
  SfIcon,
  SfImage,
  SfBanner,
  SfAlert,
  SfSticky,
  SfReview,
  SfBreadcrumbs,
  SfButton,
  SfColor
} from '@storefront-ui/vue';

import AddToCart from '~/components/AddToCart.vue';
import BookNow from '~/components/BookNow.vue';
import ImagesScroll from '~/components/ImagesScroll.vue';
import SfAccordionItem from '~/components/Accordion.vue';
import Footer from '~/components/Footer';
import { useUiState } from '~/composables';
import { useCart, cartGetters, productGetters } from '@vue-storefront/beckn';
import MobileStoreBanner from '~/components/MobileStoreBanner.vue';
import LazyHydrate from 'vue-lazy-hydration';
import { onBeforeMount, ref, watch } from '@vue/composition-api';

export default {
  middleware: 'auth',
  name: 'Product',
  transition: 'fade',

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, context) {
    const { toggleSearchVisible, clearCartPopup } = useUiState();
    const keyVal = ref(0);

    toggleSearchVisible(false);

    watch(
      () => clearCartPopup.value,
      (newVal) => {
        if (!newVal) {
          keyVal.value++;
        }
      }
    );

    const data = context.root.$route.query.data;
    const { product, bpp, bppProvider, locations } = JSON.parse(
      Buffer.from(data, 'base64').toString()
    );
    const { addItem, cart, load, isInCart } = useCart();

    const images = productGetters.getImages(product);
    const goBack = () => {
      toggleSearchVisible(true);
      context.root.$router.back();
    };

    const updateCart = async (value) => {
      addItem({
        product: product,
        quantity: value,
        customQuery: {
          bpp: bpp,
          bppProvider: bppProvider,
          locations: locations
        }
      });
      context.root.$router.push('/cart');
    };

    onBeforeMount(async () => {
      await load();
    });

    return {
      images,
      goBack,
      cart,
      updateCart,
      product,
      toggleSearchVisible,
      productGetters,
      isInCart,
      cartGetters,
      keyVal
    };
  },
  components: {
    SfAlert,
    SfColor,
    SfProperty,
    SfHeading,
    SfPrice,
    SfRating,
    SfSelect,
    SfIcon,
    SfImage,
    AddToCart,
    SfBanner,
    SfSticky,
    SfReview,
    SfBreadcrumbs,
    SfButton,
    MobileStoreBanner,
    LazyHydrate,
    SfAccordionItem,
    SfAccordion,
    ImagesScroll,
    Footer,
    BookNow
  }
};
</script>

<style lang="scss" scoped>
.trek-description-container {
  display: block;
  width: 82%;
  margin: auto;
}
.product-info-container {
  margin-left: 15px;
}

.product-description-image {
  position: relative;
  width: 100%;
  height: 197px;
}

.prod-info {
  text-align: left;
  width: 100%;
  border-collapse: collapse;
  margin-top: 5px;

  @include for-desktop {
    margin-top: 10px;
  }

  tr {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);

    &:first-child {
      border-top: thin solid rgba(0, 0, 0, 0.12);
    }
  }

  th,
  td {
    font-weight: 400;
    font-size: 0.875rem;
    height: 48px;
    padding: 0 10px;

    &.prod-info-child-td {
      padding: 0;
    }
  }

  th {
    background: #eee;
    font-weight: 500;
    width: 50%;
    word-break: break-word;
  }
}

.prod-info-child {
  @extend .prod-info;
  margin-top: 0;

  tr {
    &:first-child {
      border-top: none;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}

#product {
  box-sizing: border-box;

  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}

.icon_back {
  position: absolute;
  margin: 15px;
  z-index: 2;

  .sf-icon {
    --icon-color: #387f9a !important;
    width: 20px;
    height: 20px;
  }

  // width:100%;
}

.bottom-bar-cart {
  // display: flex;
  // justify-content: space-around;
  // margin-bottom: 0px;
  // box-shadow: 0px -5px 40px rgba(0, 0, 0, 0.15);
  position: fixed;
  bottom: 0;
  z-index: 1;
  width: 100%;

  .cart-checkout {
    background: #387f9a;
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    width: 100%;
    margin: 0;

    li {
      width: 50%;
      padding: 12px 0px 12px 50px;
      display: block;
      background: #fff;

      h3 {
        font-size: 12px;
        font-weight: 600;
        color: #000;
      }

      h4 {
        font-size: 16px;
        color: #387f9a;

        span {
          font-size: 10px;
          color: #8d9091;
          font-weight: 400;
        }
      }

      &.b-cart-blk {
        font-size: 16px;
        color: #fcfcfc;
        background: #387f9a;
        display: flex !important;
        justify-content: space-around;
        padding: 0px 25px !important;
        padding-top: 20px !important;

        .mt {
          margin-top: 4px;
        }
      }
    }
  }
}

.sf-accordion.product__tabs.has-chevron {
  margin-top: 0 !important;
  margin-bottom: 5px;

  @include for-desktop {
    margin-bottom: 10px;
  }
}

.divider {
  width: 90%;
  margin: auto;
}

.s-p-price {
  color: #387f9a;
  font-size: 22px;
}

.product {
  @include for-desktop {
    display: flex;
  }

  &__image {
    img {
      object-fit: contain !important;
    }
  }

  &__info {
    margin: var(--spacer-sm) auto;

    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }

  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;

    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }

  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }

  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    display: flex;
    justify-content: space-between;

    @include for-desktop {
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }

  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }

  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }

  &__description {
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }

  &__select-size {
    margin: 0 var(--spacer-sm);

    @include for-desktop {
      margin: 0;
    }
  }

  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }

  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }

  &__color {
    margin: 0 var(--spacer-2xs);
  }

  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;

    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }

  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }

  &__compare {
    margin-top: 0;
  }

  &__tabs {
    --tabs-title-z-index: 0;
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);

    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }

  &__property {
    margin: var(--spacer-base) 0;

    &__button {
      --button-font-size: var(--font-size--base);
    }
  }

  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }

  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );

    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);

      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }

    &__paragraph {
      margin: 0;
    }
  }

  &__gallery {
    flex: 1;
  }
}

.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}

.head-title {
  font-size: 1.2rem;
  letter-spacing: -0.36px;
  color: #387f9a;
}

.head-container {
  /* padding: 18px 22px; */
  padding-left: 18px;
  padding-top: 26px;
  padding-bottom: 31px;
}

.product__header {
  display: none;
}

@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, 30%, 0);
  }

  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
