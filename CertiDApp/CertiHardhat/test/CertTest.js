const {loadFixture} = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const {expect} = require('chai');
const { ethers } = require('hardhat');

describe('CertModule',()=>{
    async function deployContract (){
        const [admin,other] = await ethers.getSigners();
        const Cert = await ethers.getContractFactory("Cert");
        const cert = await Cert.deploy();

        return { admin, other, cert }
    }

    it('contract deployed by admin',async()=>{
        const {admin, other, cert }= await loadFixture(deployContract);
        console.log(admin.address);
        expect(cert.deploymentTransaction().from).to.equals(admin.address)
    })

    it('can read certificate',async()=>{
        const {admin, other, cert }= await loadFixture(deployContract);
        await cert.issue(129,'simi','CED','A','07/04/2025');
        const certificate = await cert.Certificates(129);
        console.log(certificate);
        expect(certificate[0]).to.equals('simi');
        expect(certificate[1]).to.equals('CHF');
        expect(certificate[2]).to.equals('A');
    })
    
    it('only admin can issue',async()=>{
        const {admin, other, cert }= await loadFixture(deployContract);
        await expect(cert.connect(other).issue(129,'simi','CED','A','07/04/2025')).to.be.revertedWith("Unauthorized Access");
    })

})