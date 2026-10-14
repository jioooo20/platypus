import * as THREE from 'three';
const MAT = {
    hull: new THREE.MeshStandardMaterial({ color: 0xdce8ee, metalness: 0.82, roughness: 0.29, flatShading: true }),
    navy: new THREE.MeshStandardMaterial({ color: 0x17364d, metalness: 0.72, roughness: 0.34, flatShading: true }),
    orange: new THREE.MeshStandardMaterial({ color: 0xfa713f, metalness: 0.55, roughness: 0.33, flatShading: true }),
    cyan: new THREE.MeshStandardMaterial({ color: 0x55f0f2, emissive: 0x20a7b0, emissiveIntensity: 1.7, metalness: 0.4, roughness: 0.25 }),
    glass: new THREE.MeshStandardMaterial({ color: 0xa5faff, emissive: 0x18bfd4, emissiveIntensity: 0.8, metalness: 0.55, roughness: 0.12 }),
    red: new THREE.MeshStandardMaterial({ color: 0xdf384e, emissive: 0x701024, emissiveIntensity: 0.45, metalness: 0.72, roughness: 0.3, flatShading: true }),
    violet: new THREE.MeshStandardMaterial({ color: 0x6c4ba3, emissive: 0x291444, emissiveIntensity: 0.42, metalness: 0.76, roughness: 0.32, flatShading: true }),
    gold: new THREE.MeshStandardMaterial({ color: 0xfac875, metalness: 0.83, roughness: 0.28, flatShading: true }),
    ink: new THREE.MeshStandardMaterial({ color: 0x102030, metalness: 0.68, roughness: 0.4, flatShading: true }),
    glow: new THREE.MeshBasicMaterial({ color: 0x54eaff }),
};
function extruded(points, depth, material, bevel = 0.045) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (const point of points.slice(1))
        shape.lineTo(point[0], point[1]);
    shape.closePath();
    const mesh = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSegments: 1, bevelSize: bevel, bevelThickness: bevel, curveSegments: 2 }), material);
    mesh.rotation.x = -Math.PI / 2;
    return mesh;
}
function sphere(group, material, position, scale, detail = [12, 8]) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, detail[0], detail[1]), material);
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    group.add(mesh);
    return mesh;
}
function box(group, material, position, size) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
    mesh.position.set(...position);
    group.add(mesh);
    return mesh;
}
export function playerModel() {
    const ship = new THREE.Group();
    ship.add(extruded([[-0.3, -1.1], [0.28, -0.92], [0.4, 0.65], [0.19, 1.3], [-0.19, 1.3], [-0.42, 0.54]], 0.24, MAT.hull));
    const left = extruded([[-0.18, -0.48], [-2.22, -1.03], [-1.68, -0.03], [-0.43, 0.56]], 0.16, MAT.navy);
    const right = extruded([[0.18, -0.48], [2.22, -1.03], [1.68, -0.03], [0.43, 0.56]], 0.16, MAT.navy);
    left.position.z = 0.08;
    right.position.z = 0.08;
    ship.add(left, right);
    const leftTip = extruded([[-1.7, -0.05], [-2.3, -0.8], [-1.9, 0.12]], 0.16, MAT.orange);
    const rightTip = extruded([[1.7, -0.05], [2.3, -0.8], [1.9, 0.12]], 0.16, MAT.orange);
    leftTip.position.z = rightTip.position.z = 0.12;
    ship.add(leftTip, rightTip);
    const canopy = sphere(ship, MAT.glass, [0, 0.55, 0.38], [0.22, 0.5, 0.12], [10, 8]);
    canopy.rotation.z = -0.12;
    for (const side of [-1, 1]) {
        box(ship, MAT.gold, [side * 0.84, -0.39, 0.14], [0.7, 0.065, 0.09]);
        const engine = sphere(ship, MAT.ink, [side * 0.38, -0.96, -0.04], [0.16, 0.3, 0.2]);
        engine.rotation.x = Math.PI / 2;
        const light = sphere(ship, MAT.cyan, [side * 0.38, -1.12, 0.02], [0.095, 0.17, 0.1], [8, 6]);
        light.userData.pulse = true;
    }
    box(ship, MAT.orange, [0, -0.04, 0.18], [0.11, 0.52, 0.04]);
    for (const y of [-0.22, 0.1])
        box(ship, MAT.gold, [0, y, 0.2], [0.23, 0.035, 0.035]);
    return ship;
}
export function enemyModel(kind) {
    const group = new THREE.Group();
    if (kind === 'scout') {
        group.add(extruded([[-0.14, -0.68], [-1.05, 0.14], [-0.52, 0.04], [-0.37, 0.67], [0, 0.98], [0.37, 0.67], [0.52, 0.04], [1.05, 0.14], [0.14, -0.68]], 0.15, MAT.orange));
        sphere(group, MAT.red, [0, 0.18, 0.18], [0.24, 0.48, 0.12]);
        for (const side of [-1, 1])
            sphere(group, MAT.gold, [side * 0.62, 0.02, 0.21], [0.11, 0.1, 0.05], [8, 6]);
    }
    else if (kind === 'gunship') {
        group.add(extruded([[-0.38, -0.75], [-1.65, -0.38], [-1.48, 0.28], [-0.48, 0.16], [-0.35, 0.83], [0, 0.98], [0.35, 0.83], [0.48, 0.16], [1.48, 0.28], [1.65, -0.38], [0.38, -0.75]], 0.19, MAT.violet));
        box(group, MAT.ink, [0, 0.12, 0.16], [0.54, 1.05, 0.2]);
        sphere(group, MAT.glass, [0, 0.39, 0.29], [0.35, 0.38, 0.13]);
        for (const side of [-1, 1]) {
            const barrel = box(group, MAT.gold, [side * 1.16, -0.34, 0.2], [0.17, 0.52, 0.18]);
            barrel.rotation.z = side * -0.18;
            sphere(group, MAT.red, [side * 0.65, -0.13, 0.28], [0.12, 0.12, 0.07], [8, 6]);
        }
    }
    else {
        const hull = new THREE.Mesh(new THREE.DodecahedronGeometry(1.2, 1), MAT.red);
        hull.scale.set(1.33, 0.82, 0.45);
        group.add(hull);
        for (const side of [-1, 1]) {
            const armor = new THREE.Mesh(new THREE.DodecahedronGeometry(0.73, 0), MAT.navy);
            armor.position.set(side * 1.02, -0.05, 0);
            armor.scale.set(1, 0.75, 0.55);
            group.add(armor);
            box(group, MAT.gold, [side * 1.03, 0.46, 0.2], [0.2, 0.42, 0.12]);
            sphere(group, MAT.orange, [side * 0.72, -0.52, 0.23], [0.38, 0.2, 0.22]);
        }
        sphere(group, MAT.glass, [0, 0.38, 0.43], [0.48, 0.42, 0.2], [14, 10]);
        for (const side of [-1, 1]) {
            const cannon = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 1.25, 8), MAT.gold);
            cannon.rotation.z = Math.PI / 2;
            cannon.position.set(side * 1.42, -0.42, 0.35);
            group.add(cannon);
            sphere(group, MAT.glow, [side * 1.97, -0.42, 0.36], [0.18, 0.21, 0.17], [8, 6]);
        }
        for (let i = 0; i < 5; i++) {
            const armor = new THREE.Mesh(new THREE.OctahedronGeometry(0.32, 0), MAT.gold);
            armor.position.set((i - 2) * 0.49, -0.72 - Math.abs(i - 2) * 0.15, 0.35);
            group.add(armor);
        }
        group.userData.boss = true;
    }
    return group;
}
export function projectileModel(friendly) {
    const group = new THREE.Group();
    const material = friendly ? MAT.cyan : MAT.red;
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(friendly ? 0.09 : 0.12, friendly ? 0.45 : 0.25, 3, 6), material);
    group.add(body);
    const halo = sphere(group, (friendly ? MAT.glow : MAT.orange).clone(), [0, 0, 0], [friendly ? 0.17 : 0.22, friendly ? 0.3 : 0.25, 0.08], [8, 6]);
    const haloMaterial = halo.material;
    haloMaterial.transparent = true;
    haloMaterial.opacity = 0.48;
    return group;
}
export function explosionModel(color) {
    const group = new THREE.Group();
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.22, 1), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 }));
    group.add(core);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.045, 6, 20), new THREE.MeshBasicMaterial({ color: 0xffd395, transparent: true, opacity: 0.78 }));
    ring.rotation.x = Math.PI / 2;
    group.add(ring);
    for (let i = 0; i < 8; i++) {
        const bit = new THREE.Mesh(new THREE.IcosahedronGeometry(0.08, 0), new THREE.MeshBasicMaterial({ color, transparent: true }));
        const angle = i / 8 * Math.PI * 2;
        bit.position.set(Math.cos(angle) * 0.4, Math.sin(angle) * 0.4, 0);
        bit.userData.velocity = [Math.cos(angle), Math.sin(angle)];
        group.add(bit);
    }
    return group;
}
export function disposeGroup(group) {
    const geometries = new Set();
    const materials = new Set();
    group.traverse((object) => {
        if (object instanceof THREE.Mesh) {
            geometries.add(object.geometry);
            for (const material of Array.isArray(object.material) ? object.material : [object.material])
                materials.add(material);
        }
    });
    for (const geometry of geometries)
        geometry.dispose();
    for (const material of materials)
        material.dispose();
}
