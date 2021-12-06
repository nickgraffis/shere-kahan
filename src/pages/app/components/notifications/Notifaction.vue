<template>
  <NotificationGroup group="foo" position="bottom">
    <div
      class="fixed inset-x-0 bottom-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none"
    >
      <div class="w-full max-w-sm">
        <Notification
          v-slot="{ notifications }"
          enter="transform ease-out duration-300 transition"
          enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enter-to="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
          move="transition duration-500"
          move-delay="delay-300"
        >
          <div
            class="flex w-full bg-black max-w-sm mx-auto mt-4 overflow-hidden rounded-lg shadow-md"
            v-for="notification in notifications"
            :key="notification.id"
          >
            <div class="px-4 py-2 -mx-3 text-white">
              <div class="mx-3">
                <span class="font-semibold">{{ notification.title }}</span>
                <p class="text-sm">{{ notification.text }}</p>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>
</template>