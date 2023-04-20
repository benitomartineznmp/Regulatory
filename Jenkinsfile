pipeline {
	agent any
	tools {
		nodejs "Node 12.14.1"
	}
	stages {
		stage('Preparation') {
			steps {
      	echo "Will deploy to ${NAME_APP}"
				sh 'rm -Rf .git/'
				sh 'rm -Rf .vscode/'
			}
		}
		stage('Create  Manifest') {
			steps {
				sh "node script.js"
			}
		}
		stage('Clean') {
			steps {
				sh "rm -Rf node_modules/"
			}
		}
		stage('Deliver for Feature CF') {
			steps {
				pushToCloudFoundry(
					target: "${PIVOTAL_URI}",
					organization: "${PIVOTAL_ORGANIZATION}",
					cloudSpace: "${PIVOTAL_TARGET}",
					credentialsId: "${PIVOTAL_CREDENTIALS}",
					pluginTimeout: '600',
					selfSigned: 'true',
					manifestChoice: [
						manifestFile: './manifest.yml'
					]
				)
			}
    }
	}
}
