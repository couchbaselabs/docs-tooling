# Feature flags

The script `flags` is designed to work with an Antora codebase with `ifdef::` and `ifndef::` macros in a specific format, to simplify the use of Feature Flags.

Consider the following Asciidoc:

```adoc
== How Couchbase Works

Couchbase works very well.

ifdef::flag-cloud[]
Couchbase now LIVES IN THE CLOUD!
endif::flag-cloud[]

ifdef::flag-kitten[]
Couchbase is powered by KITTENS!
endif::flag-kitten[]

ifdef::flag-cloud[]
ifdef::flag-kitten[]
The KITTENS are playing in the CLOUD!
endif::flag-kitten[]
endif::flag-cloud[]

== Limitations

* Blah blah

ifndef::flag-kitten[]
* Couchbase does not have a fluffy tummy.
endif::flag-kitten[]

ifndef::flag-cloud[]
* Couchbase is not provisioned on demand in the cloud.
endif::flag-cloud[]
```

This is standard Asciidoc syntax with the following requirements.

* the flags MUST have a name like `flag-xxx` 
* The `endif` statements MUST be tagged with the same tag used to open them.
  This is optional in Asciidoc syntax, but is required to allow the `flags` script to
  manipulate them simply, without having to do a full parse.

This enables the following features:

* Because the associated attributes like `flag-kitten` are NOT defined by
  default:
	* Content inside an `ifdef` will NOT be shown by default.
	* Content inside an `ifndef` WILL be shown by default.

* Nesting should work as expected.

* It is easy to enable (commit) and disable (rollback) a given flag using either
  the Antora build, or simple manipulation using the `flags` script.


## Enable a flag

You can build the site with flags enabled.

### Adding the attribute to the Antora playbook

```yml
asciidoc:
  attributes:
    flag-kitten:
```

No value is required, as we are using `ifdef`.
You MAY provide a truthy value, such as "enabled".

### Running a local build with the `--attribute` flag

```sh
antora my-playbook.yml --attribute flag-kitten
antora my-playbook.yml --attribute flag-kitten   -- attribute flag-cloud 
```

## Disable a flag

You don't need to do anything.
Because the flag attributes are unset, they are disabled by default.

## Make changes permanent with the `flags` executable

To install this, move/link both `flags` and `switch-flag` to your PATH.

### List the available flags in a repository.

Running `flags` from a directory that contains this content will show that there are two possible flags:

* flag-cloud
* flag-kitten

### Commit a flag

If you are happy that your flag works as expected, then you may want to "commit" to it.
This means that your Antora playbook and asciidoc source code don't need to be so cluttered.

NB: This will *modify* your Asciidoc source to have the same effect as always passing the attribute.
Therefore:

* Make sure all your work is committed to git.
* Check that the site build with the attributes enabled looks correct.
* Run `flags` with the preview mode first.


```sh
# PREVIEW committing flag-cloud:
flags -c flag-cloud

# LET's GO (-x to Execute)!
flags -c -x flag-cloud
```

### Rollback a flag

If your feature flag is no longer required, then you will want to remove it from
your Antora playbook and asciidoc source, to prevent them from being overly
cluttered.

NB: See warnings above - this will *modify* your Asciidoc source code. 

```sh
# PREVIEW rolling back flag-cloud:
flags -r flag-cloud

# LET's REMOVE IT (-x to Execute)!
flags -r -x flag-cloud
```

## Author

hakim.cassimally@couchbase.com (Docs tooling) 2023


