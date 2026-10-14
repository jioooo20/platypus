import * as THREE from 'three';
export declare function playerModel(): THREE.Group;
export declare function enemyModel(kind: 'scout' | 'gunship' | 'bomber'): THREE.Group;
export declare function projectileModel(friendly: boolean): THREE.Group;
export declare function explosionModel(color: number): THREE.Group;
export declare function disposeGroup(group: THREE.Group): void;
