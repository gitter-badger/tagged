from setuptools import setup, find_packages
import sys, os

version = '0.1'

setup(name='tagged',
      version=version,
      description="todo",
      long_description="""\
todo""",
      classifiers=[], # Get strings from http://pypi.python.org/pypi?%3Aaction=list_classifiers
      keywords='',
      author='Achim Domma',
      author_email='achim@domma.de',
      url='',
      license='GPL',
      packages=find_packages(exclude=['ez_setup', 'examples', 'tests']),
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          'aiohttp',
          'elasticsearch',
          'elasticsearch_dsl'
      ],
      entry_points={
          'console_scripts': [
              'run_server = tagged.app:run_server'
          ]
      }
      )
