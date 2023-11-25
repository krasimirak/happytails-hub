export const USER_ROLES = {
    guest: 'guest',
    user: 'user',
    admin: 'admin'
}

export const COLORS = {
    primary: '#3AA1A6'
}

export const PET_DETAILS = {
    name: {
        name: 'name',
        label: 'Name',
        defaultValue: '',
        inputType: 'text'
    },
    description: {
        name: 'description',
        label: 'Description',
        defaultValue: '',
        inputType: 'text'
    },
    image: {
        name: 'image',
        label: 'Image',
        defaultValue: '',
        inputType: 'url'
    },
    type: {
        name: 'type',
        label: 'type',
        defaultValue: '',
        inputType: 'select',
        values: ['dog', 'cat']
    },
    size: {
        name: 'size',
        label: 'size',
        defaultValue: '',
        inputType: 'select',
        values: ['small', 'medium', 'large', 'xlarge']
    },
    gender: {
        name: 'gender',
        label: 'gender',
        defaultValue: '',
        inputType: 'select',
        values: ['male', 'female']
    },
    age: {
        name: 'age',
        label: 'age',
        defaultValue: '',
        inputType: 'select',
        values: ['baby', 'young', 'adult', 'senior']
    },
    goodWithChildren: {
        name: 'good_with_children',
        label: 'Good with children',
        defaultValue: '',
        inputType: 'checkbox'
    },
    goodWithDogs: {
        name: 'good_with_dogs',
        label: 'Good with dogs',
        defaultValue: '',
        inputType: 'checkbox'
    },
    goodWithCats: {
        name: 'good_with_cats',
        label: 'Good with cats',
        defaultValue: '',
        inputType: 'checkbox'
    },
    houseTrained: {
        name: 'house_trained',
        label: 'House trained',
        defaultValue: '',
        inputType: 'checkbox'
    }
}