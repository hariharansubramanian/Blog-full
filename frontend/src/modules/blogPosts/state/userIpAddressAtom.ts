import {atom} from "recoil";

export const UserIpAddressAtom = atom<string | undefined>({
    key: 'userIpAddressAtom',
    default: undefined
})