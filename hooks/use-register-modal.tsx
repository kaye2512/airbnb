
import { create } from 'zustand'

interface RegisterModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
// hooks pour appeler le register modal
const UseRegisterModal = create<RegisterModalStore> ((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}));

export default UseRegisterModal;