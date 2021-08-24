import SpeedSvg from '../assets/speed.svg'
import TopSvg from '../assets/top.svg'
import DirectionSvg from '../assets/direction.svg'
import GasolineSvg from '../assets/gasoline.svg'
import EnergySvg from '../assets/flash.svg'
import UnionSvg from '../assets/union.svg'
import AvatarSvg from '../assets/avatar.svg'

export function getAccessoryIcon(type: string){
    switch(type){
            case 'speed' :
             return SpeedSvg
            case 'acceleration' :
             return TopSvg
            case 'turning_diameter' :
             return DirectionSvg
            case 'gasoline_motor' :
             return GasolineSvg
            case 'electric_motor' :
             return EnergySvg
             case 'hybrid_motor' :
             return UnionSvg
            case 'exchange' :
             return UnionSvg
            case 'seats' :
             return AvatarSvg
            default:
             return SpeedSvg
    }
} 