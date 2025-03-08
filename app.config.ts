export default defineAppConfig({
	ui: {
		colors: {
			primary: 'indigo',
		},
		input: {
			variants: {
				size: {
					'2xl': {
						base: 'px-4 py-2.5 text-lg gap-2',
						leading: 'ps-3',
						trailing: 'pe-3',
						leadingIcon: 'size-6',
						leadingAvatarSize: 'xs',
						trailingIcon: 'size-6',
					},
				},
			},
		},
		buttonGroup: {
			variants: {
				size: {
					'2xl': '',
				},
			},
		},
		button: {
			variants: {
				size: {
					'2xl': {
						base: 'px-4 py-2.5 text-lg gap-2',
						leadingIcon: 'size-6',
						leadingAvatarSize: 'xs',
						trailingIcon: 'size-6',
					},
				},
			},
		},
		selectMenu: {
			variants: {
				size: {
					'2xl': {
						base: 'px-3 py-2.5 text-lg gap-2',
						leading: 'ps-3',
						trailing: 'pe-3',
						leadingIcon: 'size-6',
						leadingAvatarSize: 'xs',
						trailingIcon: 'size-6',
						label: 'p-2 text-sm gap-2',
						item: 'p-2 text-base gap-2',
						itemLeadingIcon: 'size-6',
						itemLeadingAvatarSize: 'xs',
						itemLeadingChip: 'size-6',
						itemLeadingChipSize: 'lg',
						itemTrailingIcon: 'size-6',
					},
				},
			},
		},
		select: {
			variants: {
				size: {
					'2xl': {
						base: 'px-3 py-2.5 text-lg gap-2',
						leading: 'ps-3',
						trailing: 'pe-3',
						leadingIcon: 'size-6',
						leadingAvatarSize: 'xs',
						trailingIcon: 'size-6',
						label: 'p-2 text-sm gap-2',
						item: 'p-2 text-base gap-2',
						itemLeadingIcon: 'size-6',
						itemLeadingAvatarSize: 'xs',
						itemLeadingChip: 'size-6',
						itemLeadingChipSize: 'lg',
						itemTrailingIcon: 'size-6',
					},
				},
			},
		},
	},
})
